import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

import { User } from '../../infra/typeorm/entities/User';
import SCOLARITY_TYPE from '../../constants/Scholarity';
import USER_PERMISSION from '../../constants/UserPermission';
import USER_TYPE from '../../constants/UserType';
import USER_GENDER from '../../constants/UserGender';

interface IRequest {
  name: string;
  email: string;
  password: string;
  dateBirth?: Date;
  nickName: string;
  gender: USER_GENDER;
  scholarity?: SCOLARITY_TYPE;
  areasInterest: string[];
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AreasInterestRepository')
    private areasInterestRepository: IAreasInterestRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    dateBirth,
    scholarity,
    nickName,
    gender,
    areasInterest = [],
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

    const foundAreasInterest = await this.areasInterestRepository.findByNames(
      areasInterest,
    );

    let areasInterestToCreate = areasInterest;

    console.log(foundAreasInterest);
    if (foundAreasInterest && foundAreasInterest.length) {
      areasInterestToCreate = foundAreasInterest
        .filter(area => !areasInterest.includes(area.name))
        .map(area => area.name);
      console.log('aqui');
    }

    const areasInterestCreated = await this.areasInterestRepository.create(
      areasInterestToCreate,
    );

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      dateBirth,
      scholarity,
      nickName,
      gender,
      type: USER_TYPE.COMMON,
      permission: USER_PERMISSION.COMMON,
      areasInterest: areasInterestCreated.concat(foundAreasInterest || []),
    });

    return user;
  }
}

export { CreateUserUseCase };
