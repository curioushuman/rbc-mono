import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MemberStatus } from '../member.model';

export class GetMembersFilterDto {
  @IsOptional()
  @IsEnum(MemberStatus)
  status?: MemberStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
