import { getRepository, Repository } from 'typeorm';
import { ICreateRefreshTokenDTO } from '../../../dtos/ICreateRefreshTokenDTO';
import { IRefreshTokensRepository } from '../../../repositories/IRefreshTokensRepository';
import { RefreshToken } from '../entities/RefreshToken';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  public async create(data: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const userToken = this.ormRepository.create(data);

    return this.save(userToken);
  }

  private async save(userToken: RefreshToken): Promise<RefreshToken> {
    return this.ormRepository.save(userToken);
  }

  public async findByToken(token: string): Promise<RefreshToken | undefined> {
    return this.ormRepository.findOne({ token });
  }

  public async invalidateToken(token: string): Promise<void> {
    await this.ormRepository.update({ token }, { valid: false });
  }
}

export { RefreshTokensRepository };
