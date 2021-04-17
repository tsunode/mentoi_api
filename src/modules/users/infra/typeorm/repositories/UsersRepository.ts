import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import {
  IFindUserByNameOrNickNameDTO,
  IFindUserByNameOrNickNameOptions,
} from '@modules/users/dtos/IFindUserByNameOrNickNameDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmailOrNickName(
    { email, nickName }: IFindUserByNameOrNickNameDTO,
    options: IFindUserByNameOrNickNameOptions,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      ...options,
      where: [{ email }, { nickName }],
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
