import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Profile } from '../schema';
import { CreateProfileDto } from '../dto';

@Injectable()
export class CreateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(CreateProfileDto, Profile, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        },
      });
    };
  }
}
