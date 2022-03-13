import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { KafkaConfig, KafkaConsumerConfig } from '@curioushuman/rbc-common';

import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Member, MemberSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
