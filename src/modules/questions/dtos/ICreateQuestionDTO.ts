import { File } from '@modules/files/infra/typeorm/entities/File';
import { AreaInterest } from '@modules/questions/infra/typeorm/entities/AreaInterest';

export interface ICreateQuestionDTO {
  title: string;
  description: string;
  areasInterest: AreaInterest[];
  userId: string;
  files?: Pick<File, 'fileName' | 'mimeType'>[];
}
