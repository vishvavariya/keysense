import type { KeyDef, KeyboardLockCode } from '@/lib/types';

export const lockKeyCodes: KeyboardLockCode[] = ['CapsLock', 'NumLock', 'ScrollLock'];

const lockCodeByKeyCode: Record<string, KeyboardLockCode> = {
  CapsLock: 'CapsLock',
  NumLock: 'NumLock',
  NumpadClear: 'NumLock',
  ScrollLock: 'ScrollLock',
};

export function getLockCodeForKey(code: string): KeyboardLockCode | undefined {
  return lockCodeByKeyCode[code];
}

export function isLockKey(keyDef: KeyDef): boolean {
  return getLockCodeForKey(keyDef.code) !== undefined;
}

export function isLockKeyActive(keyDef: KeyDef, lockKeys?: Set<KeyboardLockCode>): boolean {
  const lockCode = getLockCodeForKey(keyDef.code);
  return Boolean(lockCode && lockKeys?.has(lockCode));
}
