import { getRepository, Repository } from 'typeorm';

import AreaInterest from '@modules/questions/infra/typeorm/entities/AreaInterest';
import IAreaInterestRepository from '@modules/questions/repositories/IAreasInterestRepository';

class AreasInterestRepository implements IAreaInterestRepository {
  private ormRepository: Repository<AreaInterest>;

  constructor() {
    this.ormRepository = getRepository(AreaInterest);
  }

  public async findByName(name: string): Promise<AreaInterest | undefined> {
    const areaInterest = await this.ormRepository.findOne({ name });

    return areaInterest;
  }
}

export default AreasInterestRepository;
