import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import USER_PERMISSION from '../../constants/UserPermission';

interface IRequest {
  id: string;
  idToDelete: string;
  role: USER_PERMISSION;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, idToDelete, role }: IRequest): Promise<boolean> {
    console.log(id, idToDelete);
    if (id !== idToDelete && role !== USER_PERMISSION.ADMIN) {
      throw new AppError(`You don't have access to this action`, 403);
    }

    const checkUserExistis = await this.usersRepository.findById(id);

    if (!checkUserExistis) {
      throw new AppError(`User not found`, 404);
    }

    return this.usersRepository.delete(checkUserExistis);
  }
}

export { DeleteUserUseCase };
