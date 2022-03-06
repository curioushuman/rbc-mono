import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Tier } from '../schema';
import { UpdateTierDto } from '../dto';

@Injectable()
export class UpdateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(UpdateTierDto, Tier, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
    };
  }
}
