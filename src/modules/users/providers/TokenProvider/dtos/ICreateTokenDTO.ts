import { USER_PERMISSION } from '@modules/users/constants/UserPermission';

export interface ICreateTokenDTO {
  userId: string;
  role: USER_PERMISSION;
}
