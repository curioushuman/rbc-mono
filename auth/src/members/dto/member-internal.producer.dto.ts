import { Expose, Transform } from 'class-transformer';

import { MembersEmailService } from '../members-email.service';

export class MemberInternalProducerDto {
  /**
   * Identifier for member. Set to the ID of this person in the CRM.
   */
  @Expose()
  id!: string;

  /**
   * Email address of the member.
   * @example joliet@bluesbrothers.com
   */
  @Expose()
  @Transform(({ obj }) => MembersEmailService.getPrimaryEmail(obj))
  email!: string;
}
