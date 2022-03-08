import { IsEmail } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateMemberDto {
  /**
   * Identifier for member. Set to the ID of this person in the CRM.
   */
  @AutoMap()
  id!: string;

  /**
   * Email address of the member.
   * @example joliet@bluesbrothers.com
   */
  @IsEmail()
  email!: string;
}
