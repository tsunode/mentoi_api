import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { RefreshToken } from '@modules/users/infra/typeorm/entities/RefreshToken';
import {
  IResponseGenerateRefreshToken,
  ITokenProvider,
} from '../models/ITokenProvider';
import { IRefreshTokensRepository } from '../../../repositories/IRefreshTokensRepository';
import { ICreateTokenDTO } from '../dtos/ICreateTokenDTO';

@injectable()
class TokenProvider implements ITokenProvider {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async generateToken({
    role,
    userId,
  }: ICreateTokenDTO): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({ role }, secret, {
      subject: userId,
      expiresIn,
    });
  }

  public async generateRefrashToken(
    userId: string,
  ): Promise<IResponseGenerateRefreshToken> {
    const { secret, expiresIn } = authConfig.jwtRefresh;

    const expiresAt = new Date(Date.now() + expiresIn);

    const token = sign({}, secret, {
      subject: userId,
      expiresIn: expiresAt.getTime(),
    });

    await this.refreshTokensRepository.create({
      userId,
      valid: true,
      token,
      expiresAt,
    });

    return {
      token,
      expiresAt,
    };
  }

  public async validateRefreshToken(
    refreshToken: string,
  ): Promise<RefreshToken> {
    const token = await this.refreshTokensRepository.findByToken(refreshToken);

    if (!this.isRefreshTokenValid(token)) {
      throw new AppError('Failed to authenticate user', 401);
    }

    await this.refreshTokensRepository.invalidateToken(refreshToken);

    return token as RefreshToken;
  }

  private isRefreshTokenValid(refreshToken: RefreshToken | undefined) {
    if (!refreshToken) {
      return false;
    }

    if (!refreshToken.valid) {
      return false;
    }

    if (refreshToken.expiresAt.getTime() < Date.now()) {
      return false;
    }

    return true;
  }
}

export { TokenProvider };
