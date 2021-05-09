import { Question } from '@modules/questions/infra/typeorm/entities/Question';
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { Answer };
