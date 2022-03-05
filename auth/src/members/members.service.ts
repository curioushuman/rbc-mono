import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CommonService } from '@curioushuman/rbc-common';

import { Member, MemberModel } from './schema';
import { CreateMemberDto } from './dto';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectModel(Member.name)
    private memberModel: MemberModel,
    private commonService: CommonService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  getHello(): string {
    return this.commonService.getHello();
  }

  /**
   * TODO: abstract the error handling
   */
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.mapper.map(createMemberDto, Member, CreateMemberDto);
    const createdMember = new this.memberModel(member);
    try {
      return await createdMember.save();
    } catch (error) {
      // If it's a known Mongoose error then...
      if (error.type === MongooseError && error.name === 'ValidationError') {
        this.logger.warn(`MongoDB Validation error: ${error.message}`);
        // Clean it, and pass back something more generic
        throw new Error(`Error creating member: ${error.message}`);
      }
      // Otherwise log the fact we haven't considered this type of error yet (agggh)
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }
}
