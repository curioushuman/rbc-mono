import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateMemberDto {
  /**
   * Identifier for member. Set to the ID of this person in the CRM.
   */
  @AutoMap()
  @IsString()
  id!: string;

  /**
   * Email address of the member.
   * @example joliet@bluesbrothers.com
   */
  @IsEmail()
  email!: string;

  /**
   * Members first name
   * @example Jake
   */
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * Members first name
   * @example Blues
   */
  @IsString()
  @IsOptional()
  lastName?: string;
}
