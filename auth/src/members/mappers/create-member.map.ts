import { Expose, Transform } from 'class-transformer';

import { Member, MemberEmail } from '../schema';
import { Profile } from '../../profiles/schema';

/**
 * This converts data coming in (via DTO) to underlying DB structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class CreateMemberMap implements Member {
  @Expose()
  id: string;

  // TODO This needs to be resolved
  // @Transform(({ obj }) => 'overidden@transform.dto')
  emails: MemberEmail[];

  profile: Profile;
}
