import { AutoMap } from '@automapper/classes';

import { Permission } from '../schema';

export class PermissionsDto {
  /**
   * Machine readable name that identifies this role
   */
  @AutoMap()
  label!: string;

  /**
   * List of permissions to be granted to the role
   */
  @AutoMap({ typeFn: () => Permission })
  permissions!: Permission[];
}
