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
   * * Note: Is optional in update, model level validation will catch missing last names
   * @example Blues
   */
  @AutoMap()
  @IsString()
  @IsOptional()
  lastName?: string;
}
