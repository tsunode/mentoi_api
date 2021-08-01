import { User } from '../infra/typeorm/entities/User';
import { SOLICITATION_TYPE } from '../constants/SolicitationType';

export interface ICreateSolicitationDTO {
  user: User | undefined;
  type: SOLICITATION_TYPE;
  observation?: string;
}
