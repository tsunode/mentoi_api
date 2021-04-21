import { User } from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import {
  IFindUserByNameOrNickNameDTO,
  IFindUserByNameOrNickNameOptions,
} from '../dtos/IFindUserByNameOrNickNameDTO';

export interface IUsersRepository {
  findByEmailOrNickName(
    data: IFindUserByNameOrNickNameDTO,
    options?: IFindUserByNameOrNickNameOptions,
  ): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
