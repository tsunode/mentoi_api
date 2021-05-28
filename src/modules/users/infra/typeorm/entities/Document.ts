import { File } from '@modules/files/infra/typeorm/entities/File';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('documents')
class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ name: 'file_id' })
  fileId: string;

  @OneToOne(() => File, file => file.document, { cascade: true })
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.documents)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  viewed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Document;
