import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, CamelCaseNamingConvention, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { MembersEmailService } from '../members-email.service';
import { Member, Email } from '../schema';
import { CreateMemberDto } from '../dto';

// TODO
// - create separate functions for the member mapping below

@Injectable()
export class CreateMapperProfile extends AutomapperProfile {
  constructor(
    @InjectMapper() mapper: Mapper,
    private membersEmailService: MembersEmailService,
  ) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper
        .createMap(CreateMemberDto, Member, {
          namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
          },
        })
        .forMember(
          (destination) => destination.emails,
          mapFrom((source) => {
            const email = new Email(source.email);
            email.primary = true;
            return [email];
          }),
        )
        .forMember(
          (destination) => destination.profile.firstName,
          mapFrom((source) => source.firstName),
        )
        .forMember(
          (destination) => destination.profile.lastName,
          mapFrom((source) => source.lastName),
        );
    };
  }
}
