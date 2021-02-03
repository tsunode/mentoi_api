import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_areas_interest')
class QuestionAreaInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  area_interest_id: string;
}

export default QuestionAreaInterest;
