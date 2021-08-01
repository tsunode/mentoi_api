import { celebrate, Segments, Joi } from 'celebrate';

import { SOLICITATION_TYPE } from '@modules/users/constants/SolicitationType';

const SolicitationValidators = {
  create: celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().optional(),
      type: Joi.string()
        .valid(...Object.values(SOLICITATION_TYPE))
        .required(),
      observation: Joi.string().optional().allow('', null),
    },
  }),
};

export { SolicitationValidators };
