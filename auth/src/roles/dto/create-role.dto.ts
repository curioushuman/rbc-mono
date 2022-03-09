import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateRoleDto {
  /**
   * Machine readable name for the role e.g. 'admin'
   */
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  label!: string;

  /**
   * An identifier for a SubscriptionType (from Subscription Service)
   */
  @AutoMap()
  @IsString()
  @IsOptional()
  subscriptionTypeId?: string;
}
