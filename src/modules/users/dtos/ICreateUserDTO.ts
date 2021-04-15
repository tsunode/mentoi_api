import USER_TYPE from '@modules/users/constants/UserType';
import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import USER_PERMISSION from '../constants/UserPermission';
import USER_GENDER from '../constants/UserGender';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  dateBirth?: Date;
  nickName: string;
  gender: USER_GENDER;
  scholarity?: SCOLARITY_TYPE;
  type: USER_TYPE;
  permission: USER_PERMISSION;
}
