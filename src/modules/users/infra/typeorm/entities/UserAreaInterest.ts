import AreaInterest from '@modules/questions/infra/typeorm/entities/AreaInterest';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('user_areas_interest')
class QuestionAreaInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  area_interest_id: string;

  @ManyToOne(() => User, user => user.userAreaInterest)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => AreaInterest, areaInterest => areaInterest.userAreaInterest)
  @JoinColumn({ name: 'area_interest_id' })
  areaInterest: AreaInterest;
}

export default QuestionAreaInterest;
