export const REDIS_CLIENT = 'REDIS_CLIENT';

export const REDIS_KEYS = {
  refreshToken: (userId: string, jti: string) =>
    `auth:refresh_token:${userId}:${jti}`,

  blacklistedToken: (jti: string) => `auth:blacklist:${jti}`,
} as const;
