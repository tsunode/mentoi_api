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
      areaInterest: Joi.string().optional(),
      q: Joi.string().optional(),
      userId: Joi.string().uuid().optional(),
      status: Joi.number().min(0).max(1).optional(),
    },
  }),
  show: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  delete: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  complaint: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      answerId: Joi.string().optional(),
      observation: Joi.string().optional(),
    },
  }),
};

export { QuestionValidators };
