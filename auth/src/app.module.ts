import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes as AutomapperClasses } from '@automapper/classes';

import { MembersModule } from './members/members.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://auth-mongo-srv/auth'),
    AutomapperModule.forRoot({
      options: [{ name: 'Mapper', pluginInitializer: AutomapperClasses }],
      singular: true,
    }),
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
