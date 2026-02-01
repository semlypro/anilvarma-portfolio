import Anthropic from '@anthropic-ai/sdk';

/**
 * Anthropic Claude API Client
 *
 * Configured for SEO Agent execution with streaming support
 */

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

export const CLAUDE_MODEL = 'claude-sonnet-4-20250514' as const;
export const MAX_TOKENS = 4096;

export interface StreamingOptions {
  systemPrompt: string;
  userMessage: string;
  maxTokens?: number;
  temperature?: number;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}

/**
 * Create a streaming Claude API request
 *
 * @param options - Streaming configuration
 * @returns Async iterable of text chunks
 */
export async function * streamClaude(
  options: StreamingOptions
): AsyncGenerator<string, TokenUsage, undefined> {
  const {
    systemPrompt,
    userMessage,
    maxTokens = MAX_TOKENS,
    temperature = 1.0
  } = options;

  let inputTokens = 0;
  let outputTokens = 0;

  try {
    const stream = await anthropic.messages.stream({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    // Stream text chunks
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta') {
        if (chunk.delta.type === 'text_delta') {
          yield chunk.delta.text;
        }
      }

      // Capture token usage from message_start event
      if (chunk.type === 'message_start') {
        inputTokens = chunk.message.usage.input_tokens;
      }

      // Capture final token usage from message_delta event
      if (chunk.type === 'message_delta') {
        if (chunk.usage) {
          outputTokens = chunk.usage.output_tokens;
        }
      }
    }

    // Return token usage at the end
    return {
      inputTokens,
      outputTokens
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Claude API request failed'
    );
  }
}

/**
 * Create a non-streaming Claude API request
 *
 * @param options - Request configuration
 * @returns Response text and token usage
 */
export async function callClaude(
  options: StreamingOptions
): Promise<{ text: string; usage: TokenUsage }> {
  const {
    systemPrompt,
    userMessage,
    maxTokens = MAX_TOKENS,
    temperature = 1.0
  } = options;

  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    const textContent = response.content.find(block => block.type === 'text');
    const text = textContent && textContent.type === 'text' ? textContent.text : '';

    return {
      text,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens
      }
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Claude API request failed'
    );
  }
}

/**
 * Estimate token count for text (rough approximation)
 *
 * Claude uses ~4 characters per token on average
 *
 * @param text - Text to estimate tokens for
 * @returns Approximate token count
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Check if API key is configured
 */
export function isAnthropicConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export default anthropic;
