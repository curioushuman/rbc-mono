import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersEmailService } from './members-email.service';
import { CreateMapperProfile, UpdateMapperProfile } from './mappers';
import { Member, MemberSchema } from './schema';

// TODO
// - extract profile to a separate module
// - then you can do away with mappers for this module
//    - instead focus on the complexity of email updates
// - 3rd party accounts can also be in their own module
// - Roles and role assignment also in their own module

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
    MembersEmailService,
    CreateMapperProfile,
    UpdateMapperProfile,
  ],
})
export class MembersModule {}
