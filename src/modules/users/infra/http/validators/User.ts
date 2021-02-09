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
      areaInterest: Joi.array().required(),
      scholarity: Joi.string().valid(SCOLARITY_TYPE),
      nickName: Joi.string().required(),
      displayName: Joi.string().required(),
    },
  }),
};

export default UserValidators;
