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
};

export { QuestionValidators };
