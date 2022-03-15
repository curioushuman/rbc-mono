import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConfig, KafkaConsumerConfig } from '@curioushuman/rbc-common';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role, RoleSchema } from './schema';
import { RolesRepository } from './roles.repository';

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
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
