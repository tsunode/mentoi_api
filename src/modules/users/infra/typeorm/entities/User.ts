import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import USER_TYPE from '@modules/users/constants/UserType';
import USER_PERMISSION from '@modules/users/constants/UserPermission';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nick_name: string;

  @Column()
  display_name: string;

  @Column()
  email: string;

  @Column()
  date_birth: Date;

  @Column()
  verified: boolean;

  @Column()
  document_number: string;

  @Column({
    type: 'enum',
    enum: SCOLARITY_TYPE,
  })
  scholarity: string;

  @Column({
    type: 'enum',
    enum: USER_TYPE,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: USER_PERMISSION,
  })
  permission: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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

export default User;
