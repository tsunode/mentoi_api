import { celebrate, Segments, Joi } from 'celebrate';

const SessionValidators = {
  create: celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
};

export default SessionValidators;
