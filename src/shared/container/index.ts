import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AreasInterestRepository } from '@modules/questions/infra/typeorm/repositories/AreasInterestRepository';
import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAreasInterestRepository>(
  'AreasInterestRepository',
  AreasInterestRepository,
);
