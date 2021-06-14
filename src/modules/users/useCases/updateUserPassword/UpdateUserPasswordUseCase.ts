import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  id: string;
  oldPassword: string;
  password: string;
}

@injectable()
class UpdateUserPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id: userId,
    password,
    oldPassword,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    console.log(oldPassword, user.password);

    const checkOldPassword = await this.hashProvider.compareHash(
      oldPassword,
      user.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Old password does not match');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export { UpdateUserPasswordUseCase };
