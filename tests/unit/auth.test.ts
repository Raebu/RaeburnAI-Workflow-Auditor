import { describe, expect, it } from 'vitest';
import { AuthError, requireRole, requireUser } from '@/lib/auth';

function makeRequest(payload?: object) {
  const headers = new Headers();
  if (payload) {
    headers.set('x-raeburn-user', Buffer.from(JSON.stringify(payload)).toString('base64url'));
  }
  return new Request('http://localhost', { headers });
}

describe('auth and RBAC', () => {
  it('requires an authenticated user header', () => {
    expect(() => requireUser(makeRequest())).toThrow(AuthError);
  });

  it('parses a valid session user', () => {
    const user = requireUser(
      makeRequest({ id: 'user-1', email: 'owner@example.com', organisationId: 'org-1', role: 'owner' })
    );

    expect(user.role).toBe('owner');
  });

  it('blocks insufficient roles', () => {
    const user = requireUser(
      makeRequest({ id: 'user-1', email: 'viewer@example.com', organisationId: 'org-1', role: 'viewer' })
    );

    expect(() => requireRole(user, 'admin')).toThrow(AuthError);
  });
});
