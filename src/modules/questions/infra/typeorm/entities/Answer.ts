import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { getElapsedTime } from '@shared/helpers/getElapsedTime';

@Entity('answers')
class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.questions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'question_id' })
  questionId: string;

  @ManyToOne(() => Question, question => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column()
  text: string;

  @Column()
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'elapsedTime' })
  getElapsedTime(): string {
    return getElapsedTime(this.createdAt);
  }
}

export { Answer };
