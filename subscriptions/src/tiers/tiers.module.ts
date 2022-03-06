import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { CreateMapperProfile, UpdateMapperProfile } from './mappers';
import { Tier, TierSchema } from './schema';

// TODO
// - similar mapping issues
// - TESTING
//   - Once the solution to the mapper is in place and we stop getting false negatives

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tier.name, schema: TierSchema }]),
  ],
  controllers: [TiersController],
  providers: [TiersService, CreateMapperProfile, UpdateMapperProfile],
})
export class TiersModule {}
