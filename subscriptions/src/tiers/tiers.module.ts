import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    // ClientsModule.registerAsync([
    //   {
    //     name: 'NATS',
    //     useFactory: (configService: ConfigService) => {
    //       return {
    //         transport: Transport.NATS,
    //         options: {
    //           servers: configService.get<string[]>('nats.servers'),
    //         },
    //       };
    //     },
    //     inject: [ConfigService],
    //   },
    // ]),
  ],
  controllers: [TiersController],
  providers: [TiersService, TiersRepository],
})
export class TiersModule {}
