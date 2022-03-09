import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';

import { Member, MemberModel } from './schema';
import { findOneQuery } from './types';

// TODO
// - abstract the error handling into the common logging service

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectModel(Member.name)
    private memberModel: MemberModel,
  ) {}

  async findAll(): Promise<Member[]> {
    try {
      return await this.memberModel.find().exec();
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<Member> {
    const query: findOneQuery = { id };
    try {
      return await this.memberModel.findOne(query);
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  create(member: Member) {
    return this.mutate(member);
  }

  update(member: Member) {
    return this.mutate(member);
  }

  async mutate(member: Member): Promise<Member> {
    const mutatedMember = new this.memberModel(member);
    try {
      return await mutatedMember.save();
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
