import { IsEnum } from 'class-validator';
import { MemberStatus } from '../member.model';

export class UpdateMemberStatusDto {
  @IsEnum(MemberStatus)
  status: MemberStatus;
}
