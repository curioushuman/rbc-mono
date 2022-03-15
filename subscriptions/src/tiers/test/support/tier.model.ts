import { MockModel } from '../../../database/test/support/mock.model';
import { Tier } from '../../schema/tier.schema';
import { tierExisting } from '../stubs/tier.stub';

export class TierMockModel extends MockModel<Tier> {
  protected entityStub = tierExisting();
}
