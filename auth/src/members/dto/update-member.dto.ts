import { IsEmail } from 'class-validator';
import { AutoMap } from '@automapper/classes';

// TODO
// - will AutoMap work alongside swagger.PartialType?
//   - it may not matter if I move Automapper out of this section anyway

export class UpdateMemberDto {
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
