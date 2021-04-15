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

import { Exclude } from 'class-transformer';

import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import USER_TYPE from '@modules/users/constants/UserType';
import USER_PERMISSION from '@modules/users/constants/UserPermission';
import USER_GENDER from '@modules/users/constants/UserGender';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column()
  email: string;

  @Column({ name: 'date_birth' })
  dateBirth: Date;

  @Column()
  verified: boolean;

  @Column({ name: 'document_number' })
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
  type: USER_TYPE;

  @Column({
    type: 'enum',
    enum: USER_PERMISSION,
  })
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @Expose({ name: 'avatar_url' })
  // getAvatarUrl(): string | null {
  //   switch (uploadConfig.driver) {
  //     case 'disk':
  //       return this.avatar && `${process.env.APP_API_URL}/files/${this.avatar}`;
  //     case 's3':
  //       return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
  //     default:
  //       return null;
  //   }
  // }
}

export { User };
