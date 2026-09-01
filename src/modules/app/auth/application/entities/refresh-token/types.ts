export type RefreshTokenProps = {
  userUuid: string;
  tokenHash: string;
  expiresAt: Date;
  revoked?: boolean;
  replacedBy?: string | null;
  replacedAt?: Date | null;
  createdAt?: Date;
  lastUsedAt?: Date | null;
  ip?: string | null;
  userAgent?: string | null;
};

export type RefreshTokenReplaceProps = {
  revoked?: boolean;
  replacedAt?: Date | null;
  lastUsedAt?: Date | null;
};
