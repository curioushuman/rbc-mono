import { AutoMap } from '@automapper/classes';

export class UpdateTierDto {
  /**
   * Machine readable name for the tier e.g. 'gold'
   */
  @AutoMap()
  label!: string;
}
