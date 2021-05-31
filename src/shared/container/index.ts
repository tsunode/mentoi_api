import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AreasInterestRepository } from '@modules/questions/infra/typeorm/repositories/AreasInterestRepository';
import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import { QuestionsRepository } from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { AnswersRepository } from '@modules/questions/infra/typeorm/repositories/AnswersRepository';
import { SolicitationsRepository } from '@modules/users/infra/typeorm/repositories/SolicitationsRepository';
import { ISolicitationRepository } from '@modules/users/repositories/ISolicitationsRepository';
import { DocumentsRepository } from '@modules/users/infra/typeorm/repositories/DocumentsRepository';
import { IDocumentsRepository } from '@modules/users/repositories/IDocumentsRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IQuestionsRepository } from '../../modules/questions/repositories/IQuestionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
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

container.registerSingleton<ISolicitationRepository>(
  'SolicitationsRepository',
  SolicitationsRepository,
);

container.registerSingleton<IDocumentsRepository>(
  'DocumentsRepository',
  DocumentsRepository,
);
