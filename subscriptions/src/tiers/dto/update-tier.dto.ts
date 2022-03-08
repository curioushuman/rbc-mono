import { IsString, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateTierDto {
  /**
   * Machine readable name for the tier e.g. 'gold'
   */
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  label!: string;
}
