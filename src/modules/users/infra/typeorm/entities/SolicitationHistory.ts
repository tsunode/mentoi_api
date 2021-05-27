import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { SOLICITATION_STATUS } from '@modules/users/constants/SolicitationStatus';
import { User } from './User';
import { Solicitation } from './Solicitation';

@Entity('solicitation_histories')
class SolicitationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: SOLICITATION_STATUS,
  })
  status: SOLICITATION_STATUS;

  @Column({ name: 'solicitation_id' })
  createdBy: string;

  @ManyToOne(() => Solicitation, solicitation => solicitation.histories)
  @JoinColumn({ name: 'created_by' })
  solicitations: Solicitation;

  @Column({ name: 'solicitation_id' })
  solicitationId: string;

  @ManyToOne(() => User, user => user.solicitations)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { SolicitationHistory };
