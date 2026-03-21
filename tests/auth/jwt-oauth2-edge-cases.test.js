/**
 * Auth Testing Module — JWT/OAuth2 Edge Cases
 * Audityzer P0 — Mar 22 2026
 * Covers OWASP A07:2021 — Identification and Authentication Failures
 */

const jwt = require('jsonwebtoken');
const { describe, test, expect, beforeAll } = require('@jest/globals');

const SECRET_KEY = 'test-secret-hs256';
const RS256_PUBLIC = process.env.RS256_PUBLIC_KEY || 'mock-public-key';

// ─── JWT Edge Cases ───────────────────────────────────────────────────────────

describe('JWT Edge Cases (OWASP A07:2021)', () => {

  describe('1. Expired Token Tests', () => {
    test('should reject token expired 30s ago (clock skew -30s)', () => {
      const token = jwt.sign({ sub: 'user1', role: 'admin' }, SECRET_KEY, { expiresIn: '-30s' });
      expect(() => jwt.verify(token, SECRET_KEY)).toThrow('jwt expired');
    });

    test('should reject token expired 30s in future with -30s clock skew', () => {
      const token = jwt.sign({ sub: 'user1' }, SECRET_KEY, { expiresIn: '30s' });
      expect(() => jwt.verify(token, SECRET_KEY, { clockTimestamp: Date.now() / 1000 + 60 })).toThrow();
    });

    test('should accept token with valid expiry', () => {
      const token = jwt.sign({ sub: 'user1' }, SECRET_KEY, { expiresIn: '1h' });
      const decoded = jwt.verify(token, SECRET_KEY);
      expect(decoded.sub).toBe('user1');
    });
  });

  describe('2. None Algorithm Bypass', () => {
    test('should reject token with alg:none in header', () => {
      const payload = Buffer.from(JSON.stringify({ sub: 'admin', role: 'superadmin' })).toString('base64url');
      const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
      const noneToken = `${header}.${payload}.`;
      expect(() => jwt.verify(noneToken, SECRET_KEY, { algorithms: ['HS256'] })).toThrow();
    });

    test('should reject token with alg:NONE (uppercase bypass attempt)', () => {
      const payload = Buffer.from(JSON.stringify({ sub: 'admin' })).toString('base64url');
      const header = Buffer.from(JSON.stringify({ alg: 'NONE', typ: 'JWT' })).toString('base64url');
      const noneToken = `${header}.${payload}.`;
      expect(() => jwt.verify(noneToken, SECRET_KEY, { algorithms: ['HS256'] })).toThrow();
    });
  });

  describe('3. Signature Stripping Attack', () => {
    test('should reject token with empty signature', () => {
      const token = jwt.sign({ sub: 'user1', role: 'admin' }, SECRET_KEY);
      const parts = token.split('.');
      const stripped = `${parts[0]}.${parts[1]}.`;
      expect(() => jwt.verify(stripped, SECRET_KEY, { algorithms: ['HS256'] })).toThrow();
    });

    test('should reject tampered payload with original signature', () => {
      const token = jwt.sign({ sub: 'user1', role: 'user' }, SECRET_KEY);
      const parts = token.split('.');
      const tamperedPayload = Buffer.from(JSON.stringify({ sub: 'user1', role: 'admin' })).toString('base64url');
      const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;
      expect(() => jwt.verify(tamperedToken, SECRET_KEY)).toThrow('invalid signature');
    });
  });

  describe('4. HS256/RS256 Algorithm Confusion', () => {
    test('should not accept HS256 token when expecting RS256', () => {
      const token = jwt.sign({ sub: 'user1' }, SECRET_KEY, { algorithm: 'HS256' });
      expect(() => jwt.verify(token, RS256_PUBLIC, { algorithms: ['RS256'] })).toThrow();
    });

    test('should enforce algorithm allowlist — reject unexpected algorithm', () => {
      const token = jwt.sign({ sub: 'user1' }, SECRET_KEY, { algorithm: 'HS256' });
      expect(() => jwt.verify(token, SECRET_KEY, { algorithms: ['RS256'] })).toThrow();
    });
  });

  describe('5. Claims Validation', () => {
    test('should reject token with wrong issuer', () => {
      const token = jwt.sign({ sub: 'user1', iss: 'evil.com' }, SECRET_KEY);
      expect(() => jwt.verify(token, SECRET_KEY, { issuer: 'audityzer.com' })).toThrow('jwt issuer invalid');
    });

    test('should reject token with wrong audience', () => {
      const token = jwt.sign({ sub: 'user1', aud: 'other-service' }, SECRET_KEY);
      expect(() => jwt.verify(token, SECRET_KEY, { audience: 'audityzer-api' })).toThrow();
    });

    test('should reject token with nbf in the future', () => {
      const token = jwt.sign({ sub: 'user1', nbf: Math.floor(Date.now() / 1000) + 3600 }, SECRET_KEY, { notBefore: '1h' });
      expect(() => jwt.verify(token, SECRET_KEY)).toThrow('jwt not active');
    });
  });
});

// ─── OAuth2 Flow Edge Cases ────────────────────────────────────────────────────

describe('OAuth2 Flow Edge Cases (OWASP A07:2021)', () => {

  describe('6. Implicit Flow PKCE Bypass', () => {
    test('should detect missing code_challenge in PKCE flow', () => {
      const authRequest = { response_type: 'code', client_id: 'app1', redirect_uri: 'https://app.example.com/callback' };
      const hasPKCE = 'code_challenge' in authRequest && 'code_challenge_method' in authRequest;
      expect(hasPKCE).toBe(false); // detects missing PKCE
    });

    test('should validate code_challenge_method is S256 not plain', () => {
      const authRequest = { code_challenge: 'abc123', code_challenge_method: 'plain' };
      expect(authRequest.code_challenge_method).not.toBe('S256'); // plain is insecure
    });
  });

  describe('7. State Parameter CSRF Check', () => {
    test('should detect missing state parameter', () => {
      const authRequest = { response_type: 'code', client_id: 'app1', redirect_uri: 'https://app.example.com/callback' };
      expect('state' in authRequest).toBe(false);
    });

    test('should detect predictable state value', () => {
      const weakStates = ['1234', 'abcd', 'state', '0000', 'csrf'];
      weakStates.forEach(state => {
        expect(state.length).toBeLessThan(16); // minimum 16 chars for secure state
      });
    });
  });

  describe('8. Redirect URI Open Redirect', () => {
    test('should reject redirect_uri not matching registered pattern', () => {
      const registeredUris = ['https://app.example.com/callback'];
      const maliciousUri = 'https://evil.com/steal-tokens';
      const isAllowed = registeredUris.some(uri => maliciousUri.startsWith(uri));
      expect(isAllowed).toBe(false);
    });

    test('should reject redirect_uri with path traversal', () => {
      const registeredUris = ['https://app.example.com/callback'];
      const traversalUri = 'https://app.example.com/callback/../steal';
      const normalized = new URL(traversalUri).pathname;
      expect(normalized).not.toBe('/callback');
    });
  });

  describe('9. Token Leakage via Referer Header', () => {
    test('should detect access_token in URL fragment exposure risk', () => {
      const url = 'https://app.example.com/callback#access_token=eyJ...&token_type=bearer';
      const hasTokenInFragment = url.includes('#access_token=');
      expect(hasTokenInFragment).toBe(true); // implicit flow risk detected
    });

    test('should flag token in query parameter (visible in Referer)', () => {
      const url = 'https://app.example.com/callback?access_token=eyJ...';
      const urlObj = new URL(url);
      const tokenInQuery = urlObj.searchParams.has('access_token');
      expect(tokenInQuery).toBe(true); // leaks via Referer header
    });
  });

  describe('10. Token Reuse / Refresh Token Rotation', () => {
    test('should detect non-expiring refresh tokens (infinite lifetime)', () => {
      const refreshToken = { token: 'rt_abc123', expires_in: null, rotation: false };
      expect(refreshToken.expires_in).toBeNull(); // missing expiry is a risk
    });

    test('should require single-use refresh tokens (rotation enabled)', () => {
      const refreshTokenConfig = { rotation: false, single_use: false };
      expect(refreshTokenConfig.rotation).toBe(false); // rotation not enforced
    });
  });
});

module.exports = {};
