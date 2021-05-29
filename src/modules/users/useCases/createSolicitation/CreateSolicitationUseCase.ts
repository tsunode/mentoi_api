import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { SOLICITATION_TYPE } from '@modules/users/constants/SolicitationType';
import { File } from '@modules/files/infra/typeorm/entities/File';
import { IDocumentsRepository } from '@modules/users/repositories/IDocumentsRepository';
import { Solicitation } from '@modules/users/infra/typeorm/entities/Solicitation';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { ISolicitationRepository } from '../../repositories/ISolicitationsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  observation?: string;
  type: SOLICITATION_TYPE;
  files: Pick<File, 'fileName' | 'mimeType'>[];
}

@injectable()
class CreateSolicitationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SolicitationsRepository')
    private solicitationRepository: ISolicitationRepository,

    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    email,
    type,
    observation,
    files,
  }: IRequest): Promise<Solicitation> {
    const checkUserExistis = await this.usersRepository.findByEmailOrNickName({
      email,
    });

    if (!checkUserExistis) {
      throw new AppError('Email address not exists', 404);
    }

    const filesUploaded = await Promise.all(
      files.map(async file => {
        const fileName = await this.storageProvider.saveFile({
          file: file.fileName,
          path: `user/${checkUserExistis.nickName}/documents/${file.fileName}`,
        });

        return { ...file, fileName };
      }),
    );

    await this.documentsRepository.create({
      description: type,
      files: filesUploaded,
      user: checkUserExistis,
    });

    const solicitation = await this.solicitationRepository.create({
      type,
      observation,
      user: checkUserExistis,
    });

    return solicitation;
  }
}

export { CreateSolicitationUseCase };
