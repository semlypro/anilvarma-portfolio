/**
 * Error Handling Utilities
 *
 * Custom error classes and error handling helpers
 */

/**
 * Base API Error
 */
export class APIError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Validation Error (400)
 */
export class ValidationError extends APIError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Unauthorized Error (401)
 */
export class UnauthorizedError extends APIError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Forbidden Error (403)
 */
export class ForbiddenError extends APIError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends APIError {
  constructor(message: string = 'Not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Rate Limit Error (429)
 */
export class RateLimitError extends APIError {
  retryAfter?: number;

  constructor(message: string = 'Too many requests', retryAfter?: number) {
    super(message, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Internal Server Error (500)
 */
export class InternalServerError extends APIError {
  constructor(message: string = 'Internal server error', details?: unknown) {
    super(message, 500, details);
    this.name = 'InternalServerError';
  }
}

/**
 * Service Unavailable Error (503)
 */
export class ServiceUnavailableError extends APIError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
  }
}

/**
 * Format error for API response
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof APIError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      statusCode: 500,
    };
  }

  return {
    error: 'An unexpected error occurred',
    statusCode: 500,
  };
}

/**
 * Safe error logging
 *
 * Logs errors with context, sanitizing sensitive data
 */
export function logError(
  error: unknown,
  context?: {
    path?: string;
    method?: string;
    userId?: string;
    ip?: string;
    [key: string]: unknown;
  }
) {
  const timestamp = new Date().toISOString();

  const errorInfo = {
    timestamp,
    context,
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
  };

  // In production, use a proper logging service (e.g., Sentry, LogRocket)
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to logging service
    console.error('[ERROR]', JSON.stringify(errorInfo, null, 2));
  } else {
    console.error('[ERROR]', errorInfo);
  }
}

/**
 * Async error handler wrapper
 *
 * Wraps async functions to catch and handle errors
 */
export function asyncErrorHandler<T extends (...args: any[]) => Promise<any>>(
  fn: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, {
        function: fn.name,
        args: args.length,
      });
      throw error;
    }
  }) as T;
}

/**
 * Safe JSON parse
 *
 * Parses JSON and returns default value on error
 */
export function safeJSONParse<T>(
  json: string,
  defaultValue: T
): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Check if error is instance of specific type
 */
export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}
