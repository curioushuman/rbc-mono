import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes as AutomapperClasses } from '@automapper/classes';
import { HttpLoggerMiddleware, configFactory } from '@curioushuman/rbc-common';

import { TiersModule } from './tiers/tiers.module';

// TODO
// - REFACTOR: use the much cleaner method of useFactory outlined here:
//   - https://docs.nestjs.com/microservices/basics#client
//   - transport should also be coming from config
// - Create a script/function in the common module to output the full list of microservices
//   - Pull ClientsModule.client.Name from config as well

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>(
                'microservices.services.auth.clientId',
              ),
              brokers: [configService.get<string>('microservices.broker')],
            },
            consumer: {
              groupId: configService.get<string>(
                'microservices.services.auth.groupId',
              ),
            },
          },
        }),
      },
    ]),
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
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware);
  }
}
