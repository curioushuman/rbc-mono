import { Injectable } from '@nestjs/common';

import { Tier } from './schema';
import { TiersRepository } from './tiers.repository';

@Injectable()
export class TiersService {
  constructor(private readonly tiersRepository: TiersRepository) {}

  async find(): Promise<Tier[]> {
    return await this.tiersRepository.find({});
  }

  async findOne(label: string): Promise<Tier> {
    return await this.tiersRepository.findOne({ label });
  }

  create(tier: Tier): Promise<Tier> {
    return this.save(tier);
  }

  update(tier: Tier): Promise<Tier> {
    return this.save(tier);
  }

  async save(tier: Tier): Promise<Tier> {
    return this.tiersRepository.save(tier);
  }
}
