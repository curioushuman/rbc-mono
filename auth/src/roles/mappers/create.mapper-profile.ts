import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Role } from '../schema';
import { CreateRoleDto } from '../dto';

@Injectable()
export class CreateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(CreateRoleDto, Role, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
      // .forMember((destination) => destination.permissions, ignore());
    };
  }
}
