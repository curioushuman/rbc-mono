import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfilesController } from './profiles.controller';
import { Profile, ProfileSchema } from './schema';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MembersModule,
  ],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
