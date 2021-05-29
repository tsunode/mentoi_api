import { getRepository, Repository } from 'typeorm';

import { IDocumentsRepository } from '@modules/users/repositories/IDocumentsRepository';
import { ICreateDocumentDTO } from '@modules/users/dtos/ICreateDocumentDTO';
import Document from '../entities/Document';

class DocumentsRepository implements IDocumentsRepository {
  private ormRepository: Repository<Document>;

  constructor() {
    this.ormRepository = getRepository(Document);
  }

  public async create(data: ICreateDocumentDTO): Promise<Document[]> {
    const documents = data.files?.map(file =>
      this.ormRepository.create({
        user: data.user,
        description: data.description,
        file,
      }),
    );

    await this.ormRepository.save(documents);

    return documents;
  }
}

export { DocumentsRepository };
