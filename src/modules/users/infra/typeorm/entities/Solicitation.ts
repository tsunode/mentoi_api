import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { SOLICITATION_TYPE } from '@modules/users/constants/SolicitationType';
import { Exclude } from 'class-transformer';
import { User } from './User';
import { SolicitationHistory } from './SolicitationHistory';

@Entity('solicitations')
class Solicitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  observation: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Exclude()
  @ManyToOne(() => User, user => user.solicitations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: SOLICITATION_TYPE,
  })
  type: SOLICITATION_TYPE;

  @OneToMany(() => SolicitationHistory, history => history.solicitations, {
    cascade: true,
  })
  histories: SolicitationHistory[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { Solicitation };
