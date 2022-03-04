import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsOptional()
  _id: string;

  // @IsEmail()
  // email: string;
}
