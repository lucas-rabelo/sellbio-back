export interface ValidateAccessTokenInput {
  token: string;
}

export interface ValidateAccessTokenOutput {
  userUuid: string;
  email: string;
  role: string;
  jti: string;
}