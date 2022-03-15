import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  /**
   * Machine readable name for the role e.g. 'admin'
   */
  @IsString()
  @IsNotEmpty()
  label!: string;

  /**
   * An identifier for a SubscriptionType (from Subscription Service)
   */
  @IsString()
  @IsOptional()
  subscriptionTypeId?: string;
}
