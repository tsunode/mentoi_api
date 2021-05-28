import { ICreateSolicitationDTO } from '../dtos/ICreateSolicitationDTO';
import { Solicitation } from '../infra/typeorm/entities/Solicitation';

export interface ISolicitationRepository {
  create(data: ICreateSolicitationDTO): Promise<Solicitation>;
}
