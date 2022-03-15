import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { KafkaConfig, KafkaProducerConfig } from '@curioushuman/rbc-common';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';
import { MembersProducerService } from './members-producer.service';
import { MembersEmailService } from './members-email.service';
import { Member, MemberSchema } from './schema';

// TODO
// * add roles as child document to member
// - 3rd party accounts can also be in their own module

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
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
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
    MembersRepository,
    MembersEmailService,
    MembersProducerService,
  ],
  exports: [MembersService],
})
export class MembersModule {}
