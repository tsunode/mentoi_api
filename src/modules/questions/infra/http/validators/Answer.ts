import ANSWERS_EVALUATIONS from '@modules/questions/constants/AnswersEvaluations';
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
      status: Joi.number().min(0).max(1).required(),
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
      answerId: Joi.string().required(),
    },
  }),
  evaluate: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
      answerId: Joi.string().required(),
    },
    [Segments.BODY]: {
      type: Joi.string()
        .valid(...Object.values(ANSWERS_EVALUATIONS))
        .allow(null)
        .required(),
    },
  }),
};

export { AnswerValidators };
