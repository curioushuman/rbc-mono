import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {
  CreateMapperProfile,
  UpdateMapperProfile,
  PermissionsMapperProfile,
} from './mappers';
import { Role, RoleSchema } from './schema';

// TODO
// - bloody mapper fills in missing DTO fields with undefined!
//   - even if you use their special ignore() function
//   - I may need to replace it, or find another solution

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    CreateMapperProfile,
    UpdateMapperProfile,
    PermissionsMapperProfile,
  ],
})
export class RolesModule {}
