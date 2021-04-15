import { getRepository, In, Repository } from 'typeorm';

import { AreaInterest } from '@modules/questions/infra/typeorm/entities/AreaInterest';
import { IAreasInterestRepository } from '@modules/questions/repositories/IAreasInterestRepository';

class AreasInterestRepository implements IAreasInterestRepository {
  private ormRepository: Repository<AreaInterest>;

  constructor() {
    this.ormRepository = getRepository(AreaInterest);
  }

  public async findByNames(
    names: string[],
  ): Promise<AreaInterest[] | undefined> {
    const areasInterest = await this.ormRepository.find({
      select: ['id', 'name'],
      where: { name: In(names) },
    });

    return areasInterest;
  }

  public async create(names: string[]): Promise<AreaInterest[]> {
    const areasInterestName = names.map(name => ({ name }));

    const areasInterest = this.ormRepository.create(areasInterestName);

    await this.ormRepository.save(areasInterest);

    return areasInterest;
  }
}

export { AreasInterestRepository };
