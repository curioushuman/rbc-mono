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
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { merge } from 'lodash';

import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { Member } from './schema';

@Controller('members')
export class MembersController {
  constructor(
    private membersService: MembersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  /**
   * Get all members
   */
  @Get()
  async findAll() {
    try {
      return await this.membersService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a member
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let member: Member;
    try {
      member = await this.membersService.findOne({ id });
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
    const member = this.mapper.map(createMemberDto, Member, CreateMemberDto);
    try {
      return await this.membersService.create(member);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a member
   * TODO: separate PUT and PATCH; probably after you've created a separate module for profile
   */
  @Put()
  async update(@Body() updateMemberDto: UpdateMemberDto) {
    let member = await this.findOne(updateMemberDto.id);
    const memberFromDto = this.mapper.map(
      updateMemberDto,
      Member,
      UpdateMemberDto,
    );
    merge(member, memberFromDto);
    try {
      member = await this.membersService.update(member);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return member;
  }
}
