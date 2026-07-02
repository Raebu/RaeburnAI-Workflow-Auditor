import { createHash } from 'node:crypto';

export function createTextDigest(input: string) {
  return createHash('sha256').update(input).digest('hex');
}
