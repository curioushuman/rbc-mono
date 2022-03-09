import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConfig, KafkaConsumerConfig } from '@curioushuman/rbc-common';

import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Member, MemberSchema } from './schema';

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
            'microservices.services.subscriptions',
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
          // return new KafkaConsumerConfig(config).get();
        },
      },
    ]),
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
