import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes as AutomapperClasses } from '@automapper/classes';
import { HttpLoggerMiddleware, configFactory } from '@curioushuman/rbc-common';

import { TiersModule } from './tiers/tiers.module';
import { AppController } from './root/app.controller';
import { AppService } from './root/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      options: [{ name: 'Mapper', pluginInitializer: AutomapperClasses }],
      singular: true,
    }),
    TiersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware);
  }
}
