import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import USER_PERMISSION from '@modules/users/constants/UserPermission';

interface IRequest {
  id: string;
  userId: string;
  userRole: string;
}

@injectable()
class DeleteQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, userId, userRole }: IRequest): Promise<boolean> {
    const question = await this.questionsRepository.findById({
      id,
      relations: ['files'],
    });

    if (!question) {
      throw new AppError('Question not exists', 404);
    }

    if (question.userId !== userId && userRole !== USER_PERMISSION.ADMIN) {
      throw new AppError('You dont have permission to delete this question');
    }

    await Promise.all(
      question.files.map(file =>
        this.storageProvider.deleteFile(file.fileName),
      ),
    );

    return this.questionsRepository.delete(question);
  }
}

export { DeleteQuestionUseCase };
