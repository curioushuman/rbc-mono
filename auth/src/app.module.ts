import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes as AutomapperClasses } from '@automapper/classes';

import databaseConfig from './config/database.config';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
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
