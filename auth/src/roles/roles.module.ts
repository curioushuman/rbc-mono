import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConfig, KafkaConsumerConfig } from '@curioushuman/rbc-common';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {
  CreateMapperProfile,
  UpdateMapperProfile,
  PermissionsMapperProfile,
} from './mappers';
import { Role, RoleSchema } from './schema';

// TODO
// - bloody mapper fills in missing DTO fields with undefined!
//   - even if you use their special ignore() function
//   - I may need to replace it, or find another solution
// - mapper also having issues with array of objects
//   - Let's debug, and make a call on it's usefulness
// - TESTING
//   - Once the solution to the mapper is in place and we stop getting false negatives

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const config = configService.get<KafkaConfig>(
            'microservices.services.auth',
          );
          return new KafkaConsumerConfig(config).get();
        },
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    CreateMapperProfile,
    UpdateMapperProfile,
    PermissionsMapperProfile,
  ],
})
export class RolesModule {}
