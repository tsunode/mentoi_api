import { ICreateRefreshTokenDTO } from '../dtos/ICreateRefreshTokenDTO';
import { RefreshToken } from '../infra/typeorm/entities/RefreshToken';

export interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | undefined>;
  invalidateToken(token: string): Promise<void>;
}
