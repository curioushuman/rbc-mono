import { AutoMap } from '@automapper/classes';

export class PermissionsDto {
  /**
   * Machine readable name that identifies this role
   */
  @AutoMap()
  label!: string;

  /**
   * List of permissions to be granted to the role
   */
  @AutoMap()
  permissions!: string;
}
