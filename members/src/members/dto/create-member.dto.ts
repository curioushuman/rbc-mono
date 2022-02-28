import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
