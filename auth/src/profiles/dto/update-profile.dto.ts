import { IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateProfileDto {
  /**
   * Member identifier
   */
  memberId!: string;

  /**
   * Members first name
   * @example Jake
   */
  @AutoMap()
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * Members last name
   * * Note: All validation for LastName is on it's original schema
   * @example Blues
   */
  @AutoMap()
  @IsString()
  @IsOptional()
  lastName?: string;
}
