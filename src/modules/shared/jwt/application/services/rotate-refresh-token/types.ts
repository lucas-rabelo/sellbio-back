export interface RotateRefreshTokenInput {
  oldToken: string;
  userUuid: string;
  email: string;
  role: string;
}

export interface RotateRefreshTokenOutput {
  accessToken: string;
  refreshToken: string;
}