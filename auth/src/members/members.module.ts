import { Module } from '@nestjs/common';
import { CommonModule } from '@curioushuman/rbc-common';
import { MongooseModule } from '@nestjs/mongoose';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersEmailService } from './members-email.service';
import { MemberMapperProfile } from './mappers/member.mapper-profile';
// import { MembersMappingProfile } from './schema';
import { Member, MemberSchema } from './schema';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  controllers: [MembersController],
  providers: [MembersService, MembersEmailService, MemberMapperProfile],
})
export class MembersModule {}
