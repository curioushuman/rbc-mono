import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConfig, KafkaProducerConfig } from '@curioushuman/rbc-common';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersProducerService } from './members-producer.service';
import { MembersEmailService } from './members-email.service';
import { CreateMapperProfile, UpdateMapperProfile } from './mappers';
import { Member, MemberSchema } from './schema';

// TODO
// * add roles as child document to member
// - 3rd party accounts can also be in their own module

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const config = configService.get<KafkaConfig>(
            'microservices.services.auth',
          );
          // TESTING
          return {
            // name: 'KAFKA_CLIENT',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'local',
                brokers: ['kafka-srv:9092'],
              },
              consumer: {
                groupId: 'an_unique_string_id',
              },
            },
          };
          // PRODUCTION
          // return new KafkaProducerConfig(config).get();
        },
      },
    ]),
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
    MembersEmailService,
    CreateMapperProfile,
    UpdateMapperProfile,
    MembersProducerService,
  ],
  exports: [MembersService],
})
export class MembersModule {}
