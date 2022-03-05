import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateMemberDto {
  @AutoMap()
  @IsString()
  crmId!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
