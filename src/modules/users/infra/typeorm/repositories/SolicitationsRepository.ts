import { getRepository, Repository } from 'typeorm';

import { ISolicitationRepository } from '@modules/users/repositories/ISolicitationsRepository';
import { ICreateSolicitationDTO } from '@modules/users/dtos/ICreateSolicitationDTO';
import { SOLICITATION_STATUS } from '@modules/users/constants/SolicitationStatus';
import { Solicitation } from '../entities/Solicitation';

class SolicitationsRepository implements ISolicitationRepository {
  private ormRepository: Repository<Solicitation>;

  constructor() {
    this.ormRepository = getRepository(Solicitation);
  }

  public async create(data: ICreateSolicitationDTO): Promise<Solicitation> {
    const { user } = data;

    const histories = user
      ? [
          {
            description: `Solicitação criado por ${user.name}`,
            status: SOLICITATION_STATUS.PENDING,
            createdByUser: data.user,
          },
        ]
      : undefined;

    const solicitation = this.ormRepository.create({
      ...data,
      histories,
    });

    await this.ormRepository.save(solicitation);

    return solicitation;
  }
}

export { SolicitationsRepository };
