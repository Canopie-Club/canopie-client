import type { User } from '@canopie-club/prisma-client';

export const getUser = () => useState<User | null>('auth-user', () => null);
export const useSessionKey = () => useCookie<string>('@canopie-club/session-key', { maxAge: 120 });
