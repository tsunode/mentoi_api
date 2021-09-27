import { RefreshToken } from '@modules/users/infra/typeorm/entities/RefreshToken';
import { ICreateTokenDTO } from '../dtos/ICreateTokenDTO';

export interface IResponseGenerateRefreshToken {
  token: string;
  expiresAt: Date;
}

export interface ITokenProvider {
  generateToken(data: ICreateTokenDTO): Promise<string>;
  generateRefrashToken(userId: string): Promise<IResponseGenerateRefreshToken>;
  validateRefreshToken(refreshToken: string): Promise<RefreshToken>;
}
