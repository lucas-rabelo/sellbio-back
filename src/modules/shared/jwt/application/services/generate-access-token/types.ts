export interface GenerateAccessTokenInput {
  userUuid: string;
  email: string;
  role: string;
}

export interface GenerateAccessTokenOutput {
  accessToken: string;
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
  jti: string;
}