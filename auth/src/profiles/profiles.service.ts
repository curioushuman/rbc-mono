import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { Member } from '../members/schema';
import { Profile } from './schema';
import { MembersService } from '../members/members.service';
import { CreateProfileMap, UpdateProfileMap } from './mappers';
import { CreateProfileDto, UpdateProfileDto } from './dto';

// TODO
// [ ] should "map DTO to DB structure" be in a decorator?

@Injectable()
export class ProfilesService {
  constructor(private membersService: MembersService) {}

  async findOne(memberId: string): Promise<Profile | null> {
    const member = await this.membersService.findOne(memberId);
    return member?.profile ? member.profile : null;
  }

  async findMember(memberId: string): Promise<Member | null> {
    return await this.membersService.findOne(memberId);
  }

  async create(
    member: Member,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    // map DTO to DB structure
    const profileMapped = plainToInstance(CreateProfileMap, createProfileDto, {
      excludeExtraneousValues: true,
    });
    // convert to Profile for saving
    const profile = plainToInstance(Profile, profileMapped);
    // save the member with profile
    member.profile = profile;
    member = await this.membersService.updateMember(member);
    // return the profile
    return member.profile;
  }

  async update(
    member: Member,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    // map DTO to DB structure
    const profileMapped = plainToInstance(UpdateProfileMap, updateProfileDto, {
      excludeExtraneousValues: true,
    });
    // convert to Profile for saving
    const profile = plainToInstance(Profile, profileMapped);
    // merge the new info with the profile
    member.profile = this.merge(member.profile, profile);
    // save the profile
    member = await this.membersService.updateMember(member);
    // return the profile
    return member.profile;
  }

  merge(profile: Profile, updatedProfile: Profile): Profile {
    return merge(profile, updatedProfile);
  }
}
