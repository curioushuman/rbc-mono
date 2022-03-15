import { IsNotEmpty } from 'class-validator';

import { Permission } from '../schema';

export class PermissionsDto {
  /**
   * List of permissions to be granted to the role
   */
  @IsNotEmpty()
  permissions!: Permission[];
}
