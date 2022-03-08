import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Profile } from '../schema';
import { UpdateProfileDto } from '../dto';

@Injectable()
export class UpdateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(UpdateProfileDto, Profile, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
    };
  }
}
