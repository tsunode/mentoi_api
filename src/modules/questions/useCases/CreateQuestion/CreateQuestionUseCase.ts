import { injectable, inject } from 'tsyringe';

import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { File } from '@modules/files/infra/typeorm/entities/File';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  title: string;
  description: string;
  areasInterest: string[];
  userId: string;
  files?: Pick<File, 'fileName' | 'mimeType'>[] | undefined;
}

@injectable()
class CreateQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AreasInterestRepository')
    private areasInterestRepository: IAreasInterestRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    description,
    areasInterest,
    userId,
    files,
  }: IRequest): Promise<Question> {
    const checkUserExistis = await this.usersRepository.findById(userId);

    if (!checkUserExistis) {
      throw new AppError('User not exists', 404);
    }

    const foundOrCreatedAreasInterest = await this.areasInterestRepository.findOrCreate(
      areasInterest,
    );

    let filesUploaded = files;
    if (files) {
      filesUploaded = await Promise.all(
        files.map(async file => {
          const fileName = await this.storageProvider.saveFile({
            file: file.fileName,
            path: `user/${checkUserExistis.nickName}/questions/${file.fileName}`,
          });

          return { ...file, fileName };
        }),
      );
    }

    const question = await this.questionsRepository.create({
      title,
      description,
      areasInterest: foundOrCreatedAreasInterest,
      userId,
      files: filesUploaded,
    });

    return question;
  }
}

export { CreateQuestionUseCase };
