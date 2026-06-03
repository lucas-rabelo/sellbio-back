// types.ts
export interface GenerateRefreshTokenInput {
  userUuid: string;
}

export interface GenerateRefreshTokenOutput {
  refreshToken: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}
