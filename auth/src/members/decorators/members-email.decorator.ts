import { Transform } from 'class-transformer';
import { CreateMemberDto } from '../dto';
import { Member, MemberEmail } from '../schema';
import { MembersEmailService } from '../members-email.service';

export function PrimaryEmail() {
  return Transform(({ obj }) => getPrimaryEmail(obj));
}

function getPrimaryEmail(member: Member): string {
  return MembersEmailService.getPrimaryEmail(member);
}

export function CreatePrimaryEmail(): PropertyDecorator {
  return Transform(({ obj }) => createPrimaryEmail(obj));
}

function createPrimaryEmail(createMemberDto: CreateMemberDto): MemberEmail[] {
  return [MembersEmailService.createPrimaryEmail(createMemberDto.email)];
}
