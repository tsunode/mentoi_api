import { ICreateDocumentDTO } from '../dtos/ICreateDocumentDTO';
import Document from '../infra/typeorm/entities/Document';

export interface IDocumentsRepository {
  create(data: ICreateDocumentDTO): Promise<Document[]>;
}
