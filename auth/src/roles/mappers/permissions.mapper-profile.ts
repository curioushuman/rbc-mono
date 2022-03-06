import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Role } from '../schema';
import { PermissionsDto } from '../dto';

@Injectable()
export class PermissionsMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(PermissionsDto, Role, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
    };
  }
}
