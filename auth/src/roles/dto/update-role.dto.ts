import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateRoleDto {
  /**
   * Machine readable name for the role e.g. 'admin'
   */
  @AutoMap()
  @IsNotEmpty()
  label!: string;
}
