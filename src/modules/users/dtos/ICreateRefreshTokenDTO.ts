export interface ICreateRefreshTokenDTO {
  userId: string;
  token: string;
  expiresAt: Date;
  valid: boolean;
}
