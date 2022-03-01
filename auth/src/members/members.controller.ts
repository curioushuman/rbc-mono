import { Controller, Get } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  getHello(): string {
    return this.membersService.getHello();
  }
}
