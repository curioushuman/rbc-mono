import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  /**
   * Member identifier
   */
  memberId!: string;

  /**
   * Members first name
   * @example Jake
   */
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * Members last name
   * @example Blues
   */
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}
