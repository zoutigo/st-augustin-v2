import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merge classes and drop falsy values', () => {
    expect(cn('text-base', false && 'hidden', 'font-bold')).toBe('text-base font-bold');
  });
});
