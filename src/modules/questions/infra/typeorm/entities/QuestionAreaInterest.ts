import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question_areas_interest')
class QuestionAreaInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question_id: string;

  @Column()
  area_interest_id: string;
}

export default QuestionAreaInterest;
