import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  /**
   * Machine readable name for the role e.g. 'admin'
   */
  @IsString()
  @IsNotEmpty()
  label!: string;
}
