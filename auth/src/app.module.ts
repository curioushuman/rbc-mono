import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MembersModule } from './members/members.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://auth-mongo-srv/auth'),
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
