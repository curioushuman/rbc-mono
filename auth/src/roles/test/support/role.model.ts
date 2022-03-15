import { MongoDbMockModel } from '@curioushuman/rbc-common';

import { Role } from '../../schema';
import { roleExisting } from '../stubs/role.stub';

export class RoleMockModel extends MongoDbMockModel<Role> {
  protected entityStub = roleExisting();
}
