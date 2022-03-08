import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { merge } from 'lodash';

import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Profile } from './schema';
import { Member } from '../members/schema';
import { MembersService } from '../members/members.service';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private membersService: MembersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  /**
   * Get a profile
   */
  @Get(':memberId')
  async findOne(@Param('memberId') memberId: string) {
    const member = await this.findMember(memberId);
    return member.profile;
  }

  /**
   * Create a profile
   */
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const member = await this.findMember(createProfileDto.memberId);
    member.profile = this.mapper.map(
      createProfileDto,
      Profile,
      CreateProfileDto,
    );
    return this.updateMemberProfile(member);
  }

  /**
   * Atomic update of a profile
   */
  @Patch()
  async update(@Body() updateProfileDto: UpdateProfileDto) {
    const member = await this.findMember(updateProfileDto.memberId);
    const profileFromDto = this.mapper.map(
      updateProfileDto,
      Profile,
      UpdateProfileDto,
    );
    merge(member.profile, profileFromDto);
    return this.updateMemberProfile(member);
  }

  async findMember(id: string) {
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

  async updateMemberProfile(member: Member) {
    try {
      const updatedMember = await this.membersService.update(member);
      return updatedMember.profile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
