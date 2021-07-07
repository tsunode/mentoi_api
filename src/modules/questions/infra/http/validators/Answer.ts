import { celebrate, Segments, Joi } from 'celebrate';

const AnswerValidators = {
  create: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      text: Joi.string().required(),
    },
  }),
  index: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.QUERY]: {
      page: Joi.number().min(1).required(),
      pageSize: Joi.number().min(1).max(100).required(),
    },
  }),
  delete: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
      answerId: Joi.string().required(),
    },
  }),
};

export { AnswerValidators };
