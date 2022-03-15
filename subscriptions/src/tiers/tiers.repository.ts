import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../database/entity.repository';

import { Tier, TierModel, TierDocument } from './schema';

@Injectable()
export class TiersRepository extends EntityRepository<TierDocument, Tier> {
  constructor(@InjectModel(Tier.name) tierModel: TierModel) {
    super(tierModel);
  }
}
