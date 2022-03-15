import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbRepository } from '@curioushuman/rbc-common';

import { Role, RoleModel, RoleDocument } from './schema';

@Injectable()
export class RolesRepository extends MongoDbRepository<RoleDocument, Role> {
  constructor(@InjectModel(Role.name) tierModel: RoleModel) {
    super(tierModel);
  }
}
