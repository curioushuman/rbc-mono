import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

// ! To be moved to rbc-common
import { MemberInternalConsumerDto } from './dto/member-internal.consumer.dto';

import { MembersService } from './members.service';
import { Member } from './schema';

// TODO
// - extract the serialization out into a mapper service / interceptor

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /**
   * Create a member
   */
  @EventPattern('member.created')
  async onMemberCreated(data: {
    value: MemberInternalConsumerDto;
  }): Promise<void> {
    const memberDto: MemberInternalConsumerDto = data.value;
    console.log('Seriliazing dto', memberDto);
    const member = plainToInstance(Member, memberDto, {
      excludeExtraneousValues: true,
    });
    console.log('Serialized member', member);
    try {
      await this.membersService.create(member);
    } catch (error) {
      // TODO use logger
      console.error('Error creating member from event', error);
    }
  }
}
