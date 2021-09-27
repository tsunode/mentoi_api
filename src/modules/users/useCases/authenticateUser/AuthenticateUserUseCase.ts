import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import { SendTokenConfirmationUseCase } from '../sendTokenConfirmation/SendTokenConfirmationUseCase';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: string;
  refreshTokenExpiration: Date;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject(SendTokenConfirmationUseCase)
    private sendTokenConfirmationUseCase: SendTokenConfirmationUseCase,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmailOrNickName(
      { email },
      { relations: ['areasInterest'] },
    );

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!user.verified) {
      await this.sendTokenConfirmationUseCase.execute(user);
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = await this.tokenProvider.generateToken({
      role: user.permission,
      userId: user.id,
    });

    const {
      token: refreshToken,
      expiresAt: refreshTokenExpiration,
    } = await this.tokenProvider.generateRefrashToken(user.id);

    return {
      user,
      token,
      refreshToken,
      refreshTokenExpiration,
    };
  }
}

export { AuthenticateUserUseCase };
