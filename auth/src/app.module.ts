import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes as AutomapperClasses } from '@automapper/classes';

import config from './config/config';
import databaseConfig from './config/database.config';
import { MembersModule } from './members/members.module';

// TODO
// - move config to common

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [config, databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
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
