import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';
import { CommonService } from '@curioushuman/rbc-common';

import { Member, MemberModel } from './schema';
import { findOneQuery } from './types';

// TODO
// - abstract the error handling into a logging service

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectModel(Member.name)
    private memberModel: MemberModel,
    private commonService: CommonService,
  ) {}

  getHello(): string {
    return this.commonService.getHello();
  }

  async findAll(): Promise<Member[]> {
    try {
      return await this.memberModel.find().exec();
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async findOne(query: findOneQuery): Promise<Member> {
    try {
      return await this.memberModel.findOne(query);
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async create(member: Member): Promise<Member> {
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

  async update(member: Member): Promise<Member> {
    const updatedMember = new this.memberModel(member);
    try {
      return await updatedMember.save();
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
}
