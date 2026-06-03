export interface ValidateRefreshTokenInput {
  token: string;
}

export interface ValidateRefreshTokenOutput {
  userUuid: string;
  jti: string;
}