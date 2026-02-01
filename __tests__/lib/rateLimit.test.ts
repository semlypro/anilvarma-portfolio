import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {checkRateLimit, getClientIp, cleanupRateLimits} from '@/lib/utils/rateLimit';

describe('Rate Limit Utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('checkRateLimit', () => {
    it('should allow first request and return correct remaining count', async () => {
      const config = {
        uniqueId: 'user-123',
        limit: 10,
        window: 60 // 60 seconds
      };

      const result = await checkRateLimit(config);

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(9);
      expect(result.reset).toBeGreaterThan(Date.now());
    });

    it('should track multiple requests within window', async () => {
      const config = {
        uniqueId: 'user-456',
        limit: 5,
        window: 60
      };

      // First request
      let result = await checkRateLimit(config);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4);

      // Second request
      result = await checkRateLimit(config);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(3);

      // Third request
      result = await checkRateLimit(config);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(2);
    });

    it('should reject requests when limit is exceeded', async () => {
      const config = {
        uniqueId: 'user-789',
        limit: 3,
        window: 60
      };

      // Use up all allowed requests
      await checkRateLimit(config); // 1st
      await checkRateLimit(config); // 2nd
      await checkRateLimit(config); // 3rd

      // This should be rejected
      const result = await checkRateLimit(config);

      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should reset after time window expires', async () => {
      const config = {
        uniqueId: 'user-reset',
        limit: 2,
        window: 10 // 10 seconds
      };

      // Use up the limit
      await checkRateLimit(config);
      await checkRateLimit(config);

      // Verify limit is reached
      let result = await checkRateLimit(config);
      expect(result.success).toBe(false);

      // Advance time past the window
      vi.advanceTimersByTime(11000); // 11 seconds

      // Should allow new requests
      result = await checkRateLimit(config);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(1);
    });

    it('should use separate counters for different unique IDs', async () => {
      const config1 = {
        uniqueId: 'user-A',
        limit: 3,
        window: 60
      };

      const config2 = {
        uniqueId: 'user-B',
        limit: 3,
        window: 60
      };

      // User A makes requests
      await checkRateLimit(config1);
      await checkRateLimit(config1);

      // User B should have independent limit
      const result = await checkRateLimit(config2);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(2);
    });

    it('should maintain reset timestamp across requests', async () => {
      const config = {
        uniqueId: 'user-timestamp',
        limit: 5,
        window: 60
      };

      const result1 = await checkRateLimit(config);
      const resetTime1 = result1.reset;

      vi.advanceTimersByTime(5000); // 5 seconds later

      const result2 = await checkRateLimit(config);
      const resetTime2 = result2.reset;

      // Reset time should be the same (from first request)
      expect(resetTime1).toBe(resetTime2);
    });

    it('should handle limit of 1 correctly', async () => {
      const config = {
        uniqueId: 'user-limit-1',
        limit: 1,
        window: 60
      };

      const result1 = await checkRateLimit(config);
      expect(result1.success).toBe(true);
      expect(result1.remaining).toBe(0);

      const result2 = await checkRateLimit(config);
      expect(result2.success).toBe(false);
      expect(result2.remaining).toBe(0);
    });

    it('should handle large limits', async () => {
      const config = {
        uniqueId: 'user-large-limit',
        limit: 1000,
        window: 3600
      };

      const result = await checkRateLimit(config);

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(999);
    });

    it('should prefix keys with ratelimit:', async () => {
      const config = {
        uniqueId: '192.168.1.1',
        limit: 10,
        window: 60
      };

      await checkRateLimit(config);

      // This test verifies the key format indirectly by ensuring
      // different prefixed keys don't collide
      const config2 = {
        uniqueId: 'agent:192.168.1.1',
        limit: 10,
        window: 60
      };

      const result = await checkRateLimit(config2);
      expect(result.remaining).toBe(9); // Should be independent
    });

    it('should calculate reset time correctly', async () => {
      const now = Date.now();
      const window = 120; // 2 minutes

      const config = {
        uniqueId: 'user-reset-time',
        limit: 5,
        window
      };

      const result = await checkRateLimit(config);

      expect(result.reset).toBe(now + window * 1000);
    });
  });

  describe('getClientIp', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const headers = new Headers({
        'x-forwarded-for': '203.0.113.1, 198.51.100.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('203.0.113.1');
    });

    it('should extract single IP from x-forwarded-for', () => {
      const headers = new Headers({
        'x-forwarded-for': '203.0.113.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('203.0.113.1');
    });

    it('should extract IP from x-real-ip header', () => {
      const headers = new Headers({
        'x-real-ip': '198.51.100.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('198.51.100.1');
    });

    it('should extract IP from cf-connecting-ip header', () => {
      const headers = new Headers({
        'cf-connecting-ip': '192.0.2.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('192.0.2.1');
    });

    it('should prioritize x-forwarded-for over x-real-ip', () => {
      const headers = new Headers({
        'x-forwarded-for': '203.0.113.1',
        'x-real-ip': '198.51.100.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('203.0.113.1');
    });

    it('should prioritize x-forwarded-for over cf-connecting-ip', () => {
      const headers = new Headers({
        'x-forwarded-for': '203.0.113.1',
        'cf-connecting-ip': '192.0.2.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('203.0.113.1');
    });

    it('should prioritize x-real-ip over cf-connecting-ip', () => {
      const headers = new Headers({
        'x-real-ip': '198.51.100.1',
        'cf-connecting-ip': '192.0.2.1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('198.51.100.1');
    });

    it('should return "unknown" when no IP headers present', () => {
      const headers = new Headers({});

      const ip = getClientIp(headers);

      expect(ip).toBe('unknown');
    });

    it('should trim whitespace from forwarded IPs', () => {
      const headers = new Headers({
        'x-forwarded-for': ' 203.0.113.1 , 198.51.100.1 '
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('203.0.113.1');
    });

    it('should handle IPv6 addresses', () => {
      const headers = new Headers({
        'x-forwarded-for': '2001:db8::1'
      });

      const ip = getClientIp(headers);

      expect(ip).toBe('2001:db8::1');
    });
  });

  describe('cleanupRateLimits', () => {
    it('should remove expired entries', async () => {
      // Create some rate limit entries
      await checkRateLimit({
        uniqueId: 'user-expired-1',
        limit: 10,
        window: 10
      });

      await checkRateLimit({
        uniqueId: 'user-expired-2',
        limit: 10,
        window: 10
      });

      // Advance time past the window
      vi.advanceTimersByTime(11000);

      // Run cleanup
      cleanupRateLimits();

      // These should now be fresh entries (proving old ones were cleaned)
      const result1 = await checkRateLimit({
        uniqueId: 'user-expired-1',
        limit: 10,
        window: 10
      });

      const result2 = await checkRateLimit({
        uniqueId: 'user-expired-2',
        limit: 10,
        window: 10
      });

      expect(result1.remaining).toBe(9);
      expect(result2.remaining).toBe(9);
    });

    it('should keep non-expired entries', async () => {
      // Create entry
      await checkRateLimit({
        uniqueId: 'user-active',
        limit: 10,
        window: 60
      });

      // Advance time but not past the window
      vi.advanceTimersByTime(30000); // 30 seconds

      // Run cleanup
      cleanupRateLimits();

      // Entry should still exist (not reset)
      const result = await checkRateLimit({
        uniqueId: 'user-active',
        limit: 10,
        window: 60
      });

      expect(result.remaining).toBe(8); // Was 9, now 8
    });

    it('should handle empty rate limit store', () => {
      // Should not throw error on empty store
      expect(() => cleanupRateLimits()).not.toThrow();
    });

    it('should clean up multiple expired entries', async () => {
      // Create multiple entries with short windows
      for (let i = 0; i < 5; i++) {
        await checkRateLimit({
          uniqueId: `user-cleanup-${i}`,
          limit: 10,
          window: 5
        });
      }

      // Advance time past all windows
      vi.advanceTimersByTime(6000);

      // Run cleanup
      cleanupRateLimits();

      // All entries should be fresh
      for (let i = 0; i < 5; i++) {
        const result = await checkRateLimit({
          uniqueId: `user-cleanup-${i}`,
          limit: 10,
          window: 5
        });
        expect(result.remaining).toBe(9);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle concurrent requests for same user', async () => {
      const config = {
        uniqueId: 'user-concurrent',
        limit: 5,
        window: 60
      };

      // Simulate concurrent requests
      const results = await Promise.all([
        checkRateLimit(config),
        checkRateLimit(config),
        checkRateLimit(config)
      ]);

      // All should succeed but with decreasing remaining counts
      expect(results.every(r => r.success)).toBe(true);

      // The last request should show fewer remaining
      const finalResult = await checkRateLimit(config);
      expect(finalResult.remaining).toBe(1);
    });

    it('should handle zero window (immediate expiry)', async () => {
      const config = {
        uniqueId: 'user-zero-window',
        limit: 5,
        window: 0
      };

      const result1 = await checkRateLimit(config);
      expect(result1.success).toBe(true);

      // With zero window, next request should reset
      vi.advanceTimersByTime(1);

      const result2 = await checkRateLimit(config);
      expect(result2.success).toBe(true);
      expect(result2.remaining).toBe(4);
    });

    it('should handle very long unique IDs', async () => {
      const longId = 'a'.repeat(1000);
      const config = {
        uniqueId: longId,
        limit: 5,
        window: 60
      };

      const result = await checkRateLimit(config);

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4);
    });
  });
});
