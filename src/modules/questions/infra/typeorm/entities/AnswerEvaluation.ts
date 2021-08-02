import ANSWERS_EVALUATIONS from '@modules/questions/constants/AnswersEvaluations';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Answer } from './Answer';

@Entity('answers_evaluations')
class AnswerEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ANSWERS_EVALUATIONS,
  })
  type: ANSWERS_EVALUATIONS;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.questions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'answer_id' })
  answerId: string;

  @ManyToOne(() => Answer, answer => answer.evaluations)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { AnswerEvaluation };
