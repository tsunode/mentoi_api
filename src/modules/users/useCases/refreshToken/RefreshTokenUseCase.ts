import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IResponse {
  token: string;
  refreshToken: string;
  refreshTokenExpiration: Date;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute(token: string): Promise<IResponse> {
    const refreshToken = await this.tokenProvider.validateRefreshToken(token);

    const user = await this.usersRepository.findById(refreshToken.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const newToken = await this.tokenProvider.generateToken({
      userId: user.id,
      role: user.permission,
    });

    const {
      token: newRefreshToken,
      expiresAt: refreshTokenExpiration,
    } = await this.tokenProvider.generateRefrashToken(user.id);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
      refreshTokenExpiration,
    };
  }
}

export { RefreshTokenUseCase };
