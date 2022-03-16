import { Expose } from 'class-transformer';

import { Role, Permission } from '../schema';

// TODO
// [ ] Is this sufficient? Or do I need to deal with the Permission object as well?

/**
 * This converts data coming in (via DTO) to underlying DB structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class PermissionsMap implements Partial<Role> {
  label?: string;

  subscriptionTypeId?: string;

  @Expose()
  permissions: Permission[];
}
