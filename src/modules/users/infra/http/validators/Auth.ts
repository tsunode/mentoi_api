import { celebrate, Segments, Joi } from 'celebrate';

const AuthValidators = {
  forgotPassword: celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  resetPassword: celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
};

export { AuthValidators };
