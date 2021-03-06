import { Expose } from 'class-transformer';

import { Role, Permission } from '../schema';

/**
 * This converts data coming in (via DTO) to underlying DB structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class UpdateRoleMap implements Partial<Role> {
  @Expose()
  label: string;

  subscriptionTypeId?: string;

  permissions?: Permission[];
}
