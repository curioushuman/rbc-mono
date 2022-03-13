import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

// ! These are to be replaced by import from rbc-common
// ! interceptors only work in controllers doofus
import { SerializeInterceptor } from '../interceptors';

import { MemberInternalProducerDto } from './dto';
import { Member } from './schema';

@Injectable()
export class MembersProducerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Triggered when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  // UP TO topic creation

  /**
   * Triggered when the module is destroyed.
   */
  public async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  /**
   * Emit that a member has been created
   */
  public sendCreated(member: Member) {
    this.emitMember('member_created', member);
  }

  /**
   * Emit that a member has been updated
   */
  public sendUpdated(member: Member) {
    this.emitMember('member_updated', member);
  }

  /**
   * Emit member info
   */
  // @Serialize(MemberInternalProducerDto)
  @UseInterceptors(new SerializeInterceptor(MemberInternalProducerDto))
  public emitMember(topic: string, member: Member) {
    // this looks like it is serializing beforehand
    // this.kafkaClient.emit(topic, { ...member });
    console.log('Seriliazing data', member);
    const serialized = plainToInstance(MemberInternalProducerDto, member, {
      excludeExtraneousValues: true,
    });
    console.log('Serialized', serialized);
    this.kafkaClient.emit<MemberInternalProducerDto>(topic, serialized);
  }
}
