import { injectable, inject } from 'tsyringe';

import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';
import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { File } from '@modules/files/infra/typeorm/entities/File';

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
  ) {}

  public async execute({
    title,
    description,
    areasInterest,
    userId,
    files,
  }: IRequest): Promise<Question> {
    const foundOrCreatedAreasInterest = await this.areasInterestRepository.findOrCreate(
      areasInterest,
    );

    const question = await this.questionsRepository.create({
      title,
      description,
      areasInterest: foundOrCreatedAreasInterest,
      userId,
      files,
    });

    return question;
  }
}

export { CreateQuestionUseCase };
