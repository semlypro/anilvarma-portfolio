import {NextRequest, NextResponse} from 'next/server';
import {getAgentById} from '@/lib/sanity/fetch';
import {streamClaude, isAnthropicConfigured} from '@/lib/ai/anthropic';
import {agentRequestSchema, safeValidateRequest} from '@/lib/utils/validation';
import {checkRateLimit, getClientIp} from '@/lib/utils/rateLimit';
import {AgentResponse} from '@/types';

/**
 * SEO Agent API Endpoint
 *
 * Handles agent execution requests using Claude Sonnet API
 *
 * POST /api/agents/[agentId]
 * Body: { inputs: Record<string, string> }
 *
 * Returns: Streaming text response
 */

interface RouteContext {
  params: Promise<{
    agentId: string;
  }>;
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Get agentId from route params
    const {agentId} = await context.params;

    // Parse and validate request body
    const body = await request.json();
    const validation = safeValidateRequest(agentRequestSchema, {
      agentId,
      inputs: body.inputs || {}
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        },
        {status: 400}
      );
    }

    // Check if Anthropic API is configured
    if (!isAnthropicConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI service not configured'
        },
        {status: 503}
      );
    }

    // Fetch agent configuration from Sanity
    const agent = await getAgentById(agentId);

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found'
        },
        {status: 404}
      );
    }

    if (!agent.isEnabled) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent is currently disabled'
        },
        {status: 403}
      );
    }

    // Check rate limit
    const clientIp = getClientIp(request.headers);
    const rateLimitKey = `agent:${agentId}:${clientIp}`;
    const rateLimit = await checkRateLimit({
      uniqueId: rateLimitKey,
      limit: agent.usageLimit || 10, // Default to 10 requests per day
      window: 86400 // 24 hours in seconds
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          resetAt: new Date(rateLimit.reset).toISOString()
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(agent.usageLimit || 10),
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(rateLimit.reset)
          }
        }
      );
    }

    // Validate required inputs
    const requiredFields = agent.inputFields.filter(field => field.required);
    const missingFields = requiredFields.filter(
      field => !validation.data.inputs[field.name]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          fields: missingFields.map(f => f.name)
        },
        {status: 400}
      );
    }

    // Format user inputs into a message
    const userMessage = agent.inputFields
      .map(field => {
        const value = validation.data.inputs[field.name];
        if (!value) {
          return null;
        }
        return `${field.label}: ${value}`;
      })
      .filter(Boolean)
      .join('\n\n');

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let totalInputTokens = 0;
        let totalOutputTokens = 0;

        try {
          const generator = streamClaude({
            systemPrompt: agent.systemPrompt,
            userMessage,
            maxTokens: 4096,
            temperature: 1.0
          });

          for await (const chunk of generator) {
            // Check if chunk is the final token usage
            if (typeof chunk === 'object' && 'inputTokens' in chunk) {
              totalInputTokens = chunk.inputTokens;
              totalOutputTokens = chunk.outputTokens;
              break;
            }

            // Stream text chunk
            controller.enqueue(encoder.encode(chunk));
          }

          // Send usage metadata at the end
          const usageData: AgentResponse = {
            output: '', // Already streamed
            usage: {
              inputTokens: totalInputTokens,
              outputTokens: totalOutputTokens
            }
          };

          controller.enqueue(
            encoder.encode(`\n\n__USAGE__:${JSON.stringify(usageData.usage)}`)
          );

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Stream failed';
          controller.enqueue(
            encoder.encode(`\n\nError: ${errorMessage}`)
          );
          controller.close();
        }
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-RateLimit-Limit': String(agent.usageLimit || 10),
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(rateLimit.reset)
      }
    });
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {status: 500}
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    {error: 'Method not allowed. Use POST.'},
    {status: 405}
  );
}
