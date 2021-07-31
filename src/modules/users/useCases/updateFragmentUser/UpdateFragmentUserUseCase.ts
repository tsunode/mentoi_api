import { injectable, inject } from 'tsyringe';
import { differenceInDays } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { SendTokenConfirmationUseCase } from '../sendTokenConfirmation/SendTokenConfirmationUseCase';

interface IRequest {
  token: string;
}

@injectable()
class UpdateFragmentUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject(SendTokenConfirmationUseCase)
    private sendTokenConfirmationUseCase: SendTokenConfirmationUseCase,
  ) {}

  public async execute({ token }: IRequest): Promise<boolean> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.createdAt;

    if (differenceInDays(Date.now(), tokenCreatedAt) > 2) {
      await this.sendTokenConfirmationUseCase.execute(user);
      throw new AppError('Token expired');
    }

    user.verified = true;

    return !!this.usersRepository.save(user);
  }
}

export { UpdateFragmentUserUseCase };
