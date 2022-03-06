import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateTierDto {
  /**
   * Machine readable name for the tier e.g. 'gold'
   */
  @AutoMap()
  @IsString()
  label!: string;
}
