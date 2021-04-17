import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { Question } from './Question';

@Entity('areas_interest')
class AreaInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.areasInterest)
  users: User[];

  @ManyToMany(() => Question, question => question.areasInterest)
  questions: Question[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { AreaInterest };
