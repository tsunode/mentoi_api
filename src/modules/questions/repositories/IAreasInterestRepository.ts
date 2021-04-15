import AreaInterest from '@modules/questions/infra/typeorm/entities/AreaInterest';

export default interface IAreasInterestRepository {
  findByNames(name: string[]): Promise<AreaInterest[] | undefined>;
  create(name: string[]): Promise<AreaInterest[]>;
}
