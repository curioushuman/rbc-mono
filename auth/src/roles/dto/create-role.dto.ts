import { IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateRoleDto {
  /**
   * Machine readable name for the role e.g. 'admin'
   */
  @AutoMap()
  @IsString()
  label!: string;

  /**
   * An identifier for a SubscriptionType (from Subscription Service)
   */
  @AutoMap()
  @IsString()
  @IsOptional()
  subscriptionTypeId?: string;
}
