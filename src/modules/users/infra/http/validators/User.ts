import { celebrate, Segments, Joi } from 'celebrate';

import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';

const UserValidators = {
  create: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      dateBirth: Joi.date().optional(),
      nickName: Joi.string().required(),
      scholarity: Joi.string()
        .valid(...Object.values(SCOLARITY_TYPE))
        .required(),
    },
  }),
};

export default UserValidators;
