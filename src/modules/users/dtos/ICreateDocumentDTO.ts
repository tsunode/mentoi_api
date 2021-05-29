import { File } from '@modules/files/infra/typeorm/entities/File';
import { User } from '../infra/typeorm/entities/User';

export interface ICreateDocumentDTO {
  user: User;
  description: string;
  files: Pick<File, 'fileName' | 'mimeType'>[];
}
