import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Tier } from '../schema';
import { CreateTierDto } from '../dto';

@Injectable()
export class CreateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(CreateTierDto, Tier, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
      // .forMember((destination) => destination.permissions, ignore());
    };
  }
}
