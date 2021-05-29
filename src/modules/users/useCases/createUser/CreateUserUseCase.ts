import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import path from 'path';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';

import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
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

interface IResponse {
  user: User;
  token: string;
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

    @inject('MailProvider')
    private mailProvider: IMailProvider,
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
  }: IRequest): Promise<IResponse> {
    const checkUserExistis = await this.usersRepository.findByEmailOrNickName({
      email,
      nickName,
    });

    if (checkUserExistis) {
      const { email: emailFind } = checkUserExistis;

      const errorType = email === emailFind ? 'Email address' : 'NickName';

      throw new AppError(`${errorType} already used`);
    }

    const foundOrCreatedAreasInterest = await this.areasInterestRepository.findOrCreate(
      areasInterest,
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
      areasInterest: foundOrCreatedAreasInterest,
    });

    const createAccountTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'create_account.hbs',
    );

    await this.mailProvider.sendMail({
      to: user.email,
      subject: 'Seja Bem vindo a nossa plataforma',
      templateData: {
        file: createAccountTemplate,
        variables: {
          name: user.name,
        },
      },
    });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.permission }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export { CreateUserUseCase };
