import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateProfileDto {
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
   * @example Blues
   */
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}
