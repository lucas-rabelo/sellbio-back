type MetaProps = {
  ip?: string;
  userAgent?: string;
};

export type CreateRefreshTokenProps = {
  userUuid: string;
  tokenUuid: string;
  tokenHash: string;
  expiresAt: Date;
  meta?: MetaProps;
};

type NewTokenProps = {
  uuid: string;
  hash: string;
  expiresAt: Date;
  meta?: MetaProps;
};

export type RotateRefreshTokenProps = {
  oldUuid: string;
  newToken: NewTokenProps;
};
