import { celebrate, Segments, Joi } from 'celebrate';

import { SOLICITATION_TYPE } from '@modules/users/constants/SolicitationType';

const SolicitationValidators = {
  create: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      documentNumber: Joi.string().required(),
      type: Joi.string()
        .valid(...Object.values(SOLICITATION_TYPE))
        .required(),
      observation: Joi.string().optional(),
    },
  }),
};

export { SolicitationValidators };
