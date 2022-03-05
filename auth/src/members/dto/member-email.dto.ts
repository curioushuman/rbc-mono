import { IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { EmailType } from '../types/email-type.enum';

// ! This is currently a candidate for deprecation

export class MemberEmailDto {
  constructor(email?: string) {
    this.email = email || null;
  }

  @IsEmail()
  email!: string;

  @IsOptional()
  type?: EmailType;

  @IsBoolean()
  @IsOptional()
  primary?: boolean;
}
