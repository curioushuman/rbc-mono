import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

import { MemberInternalDto } from './dto';
import { Member } from './schema';

/**
 * TODO
 * [ ] needs to be tested separately
 */

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
  public async sendCreated(member: Member): Promise<void> {
    await this.emitMember('member.created', member);
  }

  /**
   * Emit that a member has been updated
   */
  public async sendUpdated(member: Member): Promise<void> {
    await this.emitMember('member.updated', member);
  }

  /**
   * Emit that a members email has been changed
   */
  public async sendEmailUpdated(member: Member): Promise<void> {
    await this.emitMember('member.emailUpdated', member);
  }

  /**
   * Emit member info
   */
  public async emitMember(topic: string, member: Member): Promise<void> {
    // this looks like it is serializing beforehand
    // this.kafkaClient.emit(topic, { ...member });
    console.log('Serializing data', member);
    const serialized = plainToInstance(MemberInternalDto, member, {
      excludeExtraneousValues: true,
    });
    console.log('Serialized', serialized);
    await this.kafkaClient.emit<MemberInternalDto>(topic, serialized);
  }
}
