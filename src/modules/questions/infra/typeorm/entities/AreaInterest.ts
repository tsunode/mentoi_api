import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import UserAreaInterest from '@modules/users/infra/typeorm/entities/UserAreaInterest';

@Entity('areas_interest')
class AreaInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => UserAreaInterest,
    userAreaInterest => userAreaInterest.areaInterest,
  )
  userAreaInterest: UserAreaInterest[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AreaInterest;
