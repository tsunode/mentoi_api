import { AreaInterest } from '@modules/questions/infra/typeorm/entities/AreaInterest';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => AreaInterest, areaInterest => areaInterest.questions, {
    cascade: true,
  })
  @JoinTable({
    name: 'question_areas_interest',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'area_interest_id',
      referencedColumnName: 'id',
    },
  })
  areasInterest: AreaInterest[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { Question };
