import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConfig, KafkaConsumerConfig } from '@curioushuman/rbc-common';

import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { Tier, TierSchema } from './schema';
import { TiersRepository } from './tiers.repository';

// TODO
// - !!abstract the microservices stuff!!
// - similar mapping issues
// - TESTING
//   - Once the solution to the mapper is in place and we stop getting false negatives

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tier.name, schema: TierSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const config = configService.get<KafkaConfig>(
            'microservices.services.subscriptions',
          );
          return new KafkaConsumerConfig(config).get();
        },
      },
    ]),
  ],
  controllers: [TiersController],
  providers: [TiersService, TiersRepository],
})
export class TiersModule {}
