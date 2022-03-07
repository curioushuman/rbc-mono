import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes as AutomapperClasses } from '@automapper/classes';
import { HttpLoggerMiddleware, configFactory } from '@curioushuman/rbc-common';

import { MembersModule } from './members/members.module';
import { RolesModule } from './roles/roles.module';

// TODO
// - implement any TODOish changes that come from subscriptions

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
    }),
    ClientsModule.registerAsync([
      {
        name: 'SUBSCRIPTIONS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>(
                'microservices.services.subscriptions.clientId',
              ),
              brokers: [configService.get<string>('microservices.broker')],
            },
            consumer: {
              groupId: configService.get<string>(
                'microservices.services.subscriptions.groupId',
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
    MembersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware);
  }
}
