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
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { MembersService } from './members.service';
import { MembersProducerService } from './members-producer.service';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { CreateMemberMap, UpdateMemberMap } from './mappers';
import { Member } from './schema';

@Controller('members')
export class MembersController {
  constructor(
    private membersService: MembersService,
    private producerService: MembersProducerService,
  ) {}

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
    let member: Member;
    const memberFromDto = plainToInstance(CreateMemberMap, createMemberDto, {
      excludeExtraneousValues: true,
    });
    try {
      member = await this.membersService.create(memberFromDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    this.producerService.sendCreated(member);
    return member;
  }

  /**
   * Update a member
   * TODO: separate PUT and PATCH; probably after you've created a separate module for profile
   */
  @Put()
  async update(@Body() updateMemberDto: UpdateMemberDto) {
    let member = await this.getOne(updateMemberDto.id);
    const memberFromDto = plainToInstance(UpdateMemberMap, updateMemberDto, {
      excludeExtraneousValues: true,
    });
    merge(member, memberFromDto);
    try {
      member = await this.membersService.update(member);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    this.producerService.sendUpdated(member);
    return member;
  }
}
