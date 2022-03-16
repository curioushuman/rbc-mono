import { Expose } from 'class-transformer';

// TODO
// [ ] Include the subscription name perhaps

/**
 * This converts data from DB structure, to consistent DTO structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class RoleExternalDto {
  /**
   * Machine readable name for the role e.g. 'admin'
   */
  @Expose()
  label: string;
}
