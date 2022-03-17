import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SerializeInterceptor } from '@curioushuman/rbc-common';

import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberDto, MemberExternalDto } from './dto';
import { Member } from './schema';

@SerializeInterceptor(MemberExternalDto)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /**
   * Get all members
   */
  @Get()
  async get() {
    try {
      return await this.membersService.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a member
   */
  @Get(':id')
  async getOne(@Param('id') id: string) {
    let member: Member;
    try {
      member = await this.membersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  /**
   * Create a member
   */
  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    try {
      return await this.membersService.create(createMemberDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a member
   * TODO: separate PUT and PATCH; probably after you've created a separate module for profile
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const member = await this.getOne(id);
    try {
      return await this.membersService.update(member, updateMemberDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
