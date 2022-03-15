import { Injectable } from '@nestjs/common';

import { Member } from './schema';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async find(): Promise<Member[]> {
    return await this.membersRepository.find({});
  }

  async findOne(id: string): Promise<Member> {
    return await this.membersRepository.findOne({ id });
  }

  create(member: Member): Promise<Member> {
    return this.save(member);
  }

  update(member: Member): Promise<Member> {
    return this.save(member);
  }

  async save(member: Member): Promise<Member> {
    return this.membersRepository.save(member);
  }
}
