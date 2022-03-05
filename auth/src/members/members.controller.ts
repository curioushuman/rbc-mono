import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { MembersService } from './members.service';
import { CreateMemberDto } from './dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  /**
   * Get all members
   */
  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  /**
   * Create a member
   */
  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    try {
      return await this.membersService.create(createMemberDto);
    } catch (error) {
      // we throw HTTP exceptions at this level
      // as this controller is allllll about the HTTPs
      throw new BadRequestException(error.message);
    }
  }
}
