import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

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

  // use this syntax
  // it specifies the method is asynchronous, and returns a type-safe Promise
  // @Get()
  // async findAll(): Promise<Cat[]> {
  //   return this.catsService.findAll();
  // }
}
