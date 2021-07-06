import { uploadConfig } from '@config/upload';
import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import Document from '@modules/users/infra/typeorm/entities/Document';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @ManyToMany(() => Question, question => question.files)
  questions: Question[];

  @OneToOne(() => File, file => file.document)
  document: Document;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'fileUrl' })
  getFileUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return (
          this.fileName && `${process.env.APP_API_URL}/files/${this.fileName}`
        );
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.fileName}`;
      default:
        return null;
    }
  }
}

export { File };
