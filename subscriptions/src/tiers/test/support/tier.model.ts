import { MongoDbMockModel } from '@curioushuman/rbc-common';

import { Tier } from '../../schema';
import { tierExisting } from '../stubs/tier.stub';

export class TierMockModel extends MongoDbMockModel<Tier> {
  protected entityStub = tierExisting();
}
