import { celebrate, Segments } from 'celebrate';

import SCOLARITY_TYPE from '@modules/users/constants/Scholarity';
import USER_GENDER from '@modules/users/constants/UserGender';
import Joi from '@shared/infra/http/validators/Joi';

const userData = {
  name: Joi.string().required(),
  nickName: Joi.string().required(),
  dateBirth: Joi.date().format('YYYY-MM-DD').raw().optional(),
  gender: Joi.string()
    .valid(...Object.values(USER_GENDER))
    .required(),
  email: Joi.string().email().required(),
  scholarity: Joi.string()
    .valid(...Object.values(SCOLARITY_TYPE))
    .allow(null)
    .optional(),
  areasInterest: Joi.array().items(Joi.string()).optional(),
};

const UserValidators = {
  create: celebrate({
    [Segments.BODY]: {
      ...userData,
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  update: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: userData,
  }),
  updatePassword: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
};

export default UserValidators;
