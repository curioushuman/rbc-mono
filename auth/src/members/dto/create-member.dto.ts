import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  _id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
