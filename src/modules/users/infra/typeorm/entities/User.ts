import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { AreaInterest } from '@modules/questions/infra/typeorm/entities/AreaInterest';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import USER_TYPE from '@modules/users/constants/UserType';
import USER_PERMISSION from '@modules/users/constants/UserPermission';
import USER_GENDER from '@modules/users/constants/UserGender';
import { uploadConfig } from '@config/upload';
import { Solicitation } from './Solicitation';
import Document from './Document';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude({ toPlainOnly: true })
  id: string;

  @Column()
  name: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  email: string;

  @Column({ name: 'date_birth' })
  @Exclude({ toPlainOnly: true })
  dateBirth: Date;

  @Column()
  verified: boolean;

  @Column({ name: 'document_number' })
  @Exclude({ toPlainOnly: true })
  documentNumber: string;

  @Column({
    type: 'enum',
    enum: USER_GENDER,
  })
  gender: USER_GENDER;

  @Column({
    type: 'enum',
    enum: SCOLARITY_TYPE,
  })
  scholarity: SCOLARITY_TYPE;

  @Column({
    type: 'enum',
    enum: USER_TYPE,
  })
  @Exclude({ toPlainOnly: true })
  type: USER_TYPE;

  @Column({
    type: 'enum',
    enum: USER_PERMISSION,
  })
  @Exclude({ toPlainOnly: true })
  permission: USER_PERMISSION;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @ManyToMany(() => AreaInterest, areaInterest => areaInterest.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_areas_interest',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'area_interest_id',
      referencedColumnName: 'id',
    },
  })
  areasInterest: AreaInterest[];

  @OneToMany(() => Question, question => question.user)
  questions: Question[];

  @OneToMany(() => Document, document => document.user)
  documents: Document[];

  @OneToMany(() => Solicitation, solicitation => solicitation.user)
  solicitations: Solicitation[];

  @CreateDateColumn({ name: 'created_at' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return this.avatar && `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export { User };
