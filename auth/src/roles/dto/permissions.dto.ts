import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

import { Permission } from '../schema';

export class PermissionsDto {
  /**
   * Machine readable name that identifies this role
   */
  @AutoMap()
  @IsNotEmpty()
  label!: string;

  /**
   * List of permissions to be granted to the role
   */
  @AutoMap({ typeFn: () => Permission })
  @IsNotEmpty()
  permissions!: Permission[];
}
