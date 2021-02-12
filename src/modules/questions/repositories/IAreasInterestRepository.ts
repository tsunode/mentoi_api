import AreaInterest from '@modules/questions/infra/typeorm/entities/AreaInterest';

export default interface IAreasInterestRepository {
  findByName(name: string): Promise<AreaInterest | undefined>;
}
