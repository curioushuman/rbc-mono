import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Role } from '../schema';
import { UpdateRoleDto } from '../dto';

@Injectable()
export class UpdateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(UpdateRoleDto, Role, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
    };
  }
}
