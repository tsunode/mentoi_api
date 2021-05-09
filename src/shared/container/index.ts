import { container } from 'tsyringe';

import '@modules/users/providers';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AreasInterestRepository } from '@modules/questions/infra/typeorm/repositories/AreasInterestRepository';
import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import { QuestionsRepository } from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { AnswersRepository } from '@modules/questions/infra/typeorm/repositories/AnswersRepository';
import { IQuestionsRepository } from '../../modules/questions/repositories/IQuestionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAreasInterestRepository>(
  'AreasInterestRepository',
  AreasInterestRepository,
);

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository,
);

container.registerSingleton<IAnswersRepository>(
  'AnswersRepository',
  AnswersRepository,
);
