import { Injectable, NotFoundException } from '@nestjs/common';
import { Member, MemberStatus } from './member.model';
import { v4 as uuid } from 'uuid';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [];

  getAllMembers(): Member[] {
    return this.members;
  }

  getMembersWithFilters(filterDto: GetMembersFilterDto): Member[] {
    const { status, search } = filterDto;

    let members = this.getAllMembers();

    // do something with status
    if (status) {
      members = members.filter((member) => member.status === status);
    }

    if (search) {
      members = members.filter((member) => {
        if (
          member.title.includes(search) ||
          member.description.includes(search)
        ) {
          return true;
        }

        return false;
      });
    }

    return members;
  }

  getMemberById(id: string): Member {
    const found = this.members.find((member) => member.id === id);

    if (!found) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }

    return found;
  }

  createMember(createMemberDto: CreateMemberDto): Member {
    const { title, description } = createMemberDto;

    const member: Member = {
      id: uuid(),
      title,
      description,
      status: MemberStatus.OPEN,
    };

    this.members.push(member);
    return member;
  }

  deleteMember(id: string): void {
    const found = this.getMemberById(id);
    this.members = this.members.filter((member) => member.id !== found.id);
  }

  updateMemberStatus(id: string, status: MemberStatus) {
    const member = this.getMemberById(id);
    member.status = status;
    return member;
  }
}
