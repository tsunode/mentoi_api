import { celebrate, Segments, Joi } from 'celebrate';

import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import USER_GENDER from '@modules/users/constants/UserGender';

const UserValidators = {
  create: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      nickName: Joi.string().required(),
      dateBirth: Joi.date().optional(),
      gender: Joi.string()
        .valid(...Object.values(USER_GENDER))
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      scholarity: Joi.string()
        .valid(...Object.values(SCOLARITY_TYPE))
        .optional(),
      areasInterest: Joi.string().optional(),
    },
  }),
};

export default UserValidators;