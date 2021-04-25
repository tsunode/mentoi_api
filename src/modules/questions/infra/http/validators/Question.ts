import { celebrate, Segments, Joi } from 'celebrate';

const QuestionValidators = {
  create: celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      areasInterest: [
        Joi.array().items(Joi.string()).required(),
        Joi.string().required(),
      ],
    },
  }),
  index: celebrate({
    [Segments.QUERY]: {
      page: Joi.number().min(1).required(),
      pageSize: Joi.number().min(1).max(100).required(),
    },
  }),
  show: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
};

export { QuestionValidators };
