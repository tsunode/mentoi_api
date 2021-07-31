import { getRepository, ILike, Repository } from 'typeorm';

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
    return this.ormRepository.findOne({
      ...options,
      where: [{ email: ILike(email) }, { nickName: ILike(nickName) }],
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ email: ILike(email) });
  }

  public async findByNickName(nickName: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ nickName: ILike(nickName) });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id, {
      select: [
        'id',
        'name',
        'nickName',
        'displayName',
        'gender',
        'email',
        'verified',
        'scholarity',
        'permission',
        'dateBirth',
        'password',
        'color',
      ],
      relations: ['areasInterest'],
    });
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<boolean> {
    return !!this.ormRepository.remove(user);
  }
}

export { UsersRepository };
