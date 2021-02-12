import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import SCOLARITY_TYPE from '../constants/Scholarity';
import USER_PERMISSION from '../constants/UserPermission';
import USER_TYPE from '../constants/UserType';

interface IRequest {
  name: string;
  email: string;
  password: string;
  dateBirth?: Date;
  scholarity: SCOLARITY_TYPE;
  nickName: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    dateBirth,
    scholarity,
    nickName,
  }: IRequest): Promise<User> {
    const checkUserExistis = await this.usersRepository.findByEmailOrNickName({
      email,
      nickName,
    });

    if (checkUserExistis) {
      const { email: emailFind } = checkUserExistis;

      const errorType = email === emailFind ? 'Email address' : 'NickName';

      throw new AppError(`${errorType} already used`);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      dateBirth,
      scholarity,
      nickName,
      type: USER_TYPE.COMMON,
      permission: USER_PERMISSION.COMMON,
    });

    return user;
  }
}

export default CreateUserService;
