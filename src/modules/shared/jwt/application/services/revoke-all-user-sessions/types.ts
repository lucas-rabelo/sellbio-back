export interface RevokeAllUserSessionsInput {
  userUuid: string;
}

export interface RevokeAllUserSessionsOutput {
  deletedSessions: number;
}