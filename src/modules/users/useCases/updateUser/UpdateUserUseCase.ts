import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import USER_GENDER from '@modules/users/constants/UserGender';
import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import { User } from '../../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  dateBirth?: Date;
  nickName: string;
  gender: USER_GENDER;
  scholarity?: SCOLARITY_TYPE;
  areasInterest: string[];
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AreasInterestRepository')
    private areasInterestRepository: IAreasInterestRepository,
  ) {}

  public async execute({
    id: userId,
    email,
    nickName,
    areasInterest,
    ...restDataFromUser
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const checkEmailAlreadyUsed = await this.usersRepository.findByEmail(email);

    if (checkEmailAlreadyUsed && checkEmailAlreadyUsed.id !== userId) {
      throw new AppError(`Email address already used`);
    }

    const checkNicknameAlreadyUsed = await this.usersRepository.findByNickName(
      nickName,
    );

    if (checkNicknameAlreadyUsed && checkNicknameAlreadyUsed.id !== userId) {
      throw new AppError(`NickName already used`);
    }

    const foundOrCreatedAreasInterest = await this.areasInterestRepository.findOrCreate(
      areasInterest,
    );

    const userToUpdate = Object.assign(user, {
      email,
      nickName,
      areasInterest: foundOrCreatedAreasInterest,
      ...restDataFromUser,
    });

    return this.usersRepository.save(userToUpdate);
  }
}

export { UpdateUserUseCase };
