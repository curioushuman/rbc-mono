import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { CreateMapperProfile, UpdateMapperProfile } from './mappers';
import { Tier, TierSchema } from './schema';

// TODO
// - !!abstract the microservices stuff!!
// - similar mapping issues
// - TESTING
//   - Once the solution to the mapper is in place and we stop getting false negatives

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tier.name, schema: TierSchema }]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['kafka-srv:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'AUTH_SERVICE',
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: async (configService: ConfigService) => ({
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           clientId: configService.get<string>(
    //             'microservices.services.auth.clientId',
    //           ),
    //           // brokers: [configService.get<string>('microservices.broker')],
    //           brokers: ['kafka-srv:9092'],
    //         },
    //         consumer: {
    //           groupId: configService.get<string>(
    //             'microservices.services.auth.groupId',
    //           ),
    //         },
    //       },
    //     }),
    //   },
    // ]),
  ],
  controllers: [TiersController],
  providers: [TiersService, CreateMapperProfile, UpdateMapperProfile],
})
export class TiersModule {}
