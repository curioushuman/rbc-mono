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
import { SerializeInterceptor } from '@curioushuman/rbc-common';

import { CreateProfileDto, ProfileExternalDto, UpdateProfileDto } from './dto';
import { Profile } from './schema';
import { Member } from '../members/schema';
import { ProfilesService } from './profiles.service';

@SerializeInterceptor(ProfileExternalDto)
@Controller('members/profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  /**
   * Get a profile
   */
  @Get(':memberId')
  async getOne(@Param('memberId') memberId: string) {
    let profile: Profile;
    try {
      profile = await this.profilesService.findOne(memberId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!profile) {
      profile = new Profile();
    }
    return profile;
  }

  /**
   * Create a profile
   */
  @Post(':memberId')
  async create(
    @Param('memberId') memberId: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    // find the member
    const member = await this.findMember(memberId);
    // create the profile
    try {
      return this.profilesService.create(member, createProfileDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Atomic update of a profile
   */
  @Patch(':memberId')
  async update(
    @Param('memberId') memberId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    // find the member
    const member = await this.findMember(memberId);
    // update the profile
    try {
      return this.profilesService.update(member, updateProfileDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMember(memberId: string) {
    let member: Member;
    try {
      member = await this.profilesService.findMember(memberId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }
}
