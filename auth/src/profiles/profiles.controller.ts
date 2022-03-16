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
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';
import { SerializeInterceptor } from '@curioushuman/rbc-common';

import { CreateProfileDto, ProfileExternalDto, UpdateProfileDto } from './dto';
import { CreateProfileMap, UpdateProfileMap } from './mappers';
import { Profile } from './schema';
import { Member } from '../members/schema';
import { MembersService } from '../members/members.service';

@SerializeInterceptor(ProfileExternalDto)
@Controller('members/profiles')
export class ProfilesController {
  constructor(private membersService: MembersService) {}

  /**
   * Get a profile
   */
  @Get(':memberId')
  async getOne(@Param('memberId') memberId: string) {
    const member = await this.findMember(memberId);
    return member.profile;
  }

  /**
   * Create a profile
   */
  @Post(':memberId')
  async create(
    @Param('memberId') memberId: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const profileFromDto = plainToInstance(CreateProfileMap, createProfileDto, {
      excludeExtraneousValues: true,
    });
    const member = await this.findMember(memberId);
    member.profile = plainToInstance(Profile, profileFromDto);
    return this.updateMemberProfile(member);
  }

  /**
   * Atomic update of a profile
   */
  @Patch(':memberId')
  async update(
    @Param('memberId') memberId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const member = await this.findMember(memberId);
    const profileFromDto = plainToInstance(UpdateProfileMap, updateProfileDto, {
      excludeExtraneousValues: true,
    });
    merge(member.profile, profileFromDto);
    return this.updateMemberProfile(member);
  }

  async findMember(id: string) {
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

  async updateMemberProfile(member: Member) {
    try {
      const updatedMember = await this.membersService.update(member);
      return updatedMember.profile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
