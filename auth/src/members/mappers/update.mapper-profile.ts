import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Member, MemberEmail } from '../schema';
import { UpdateMemberDto } from '../dto';

// TODO
// - create separate functions for the member mapping below

@Injectable()
export class UpdateMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper
        .createMap(UpdateMemberDto, Member, {
          namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
          },
        })
        .forMember(
          (destination) => destination.emails,
          mapFrom((source) => {
            const email = new MemberEmail(source.email);
            email.primary = true;
            return [email];
          }),
        );
    };
  }
}
