import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';

import { Tier, TierModel } from './schema';
import { findOneQuery } from './types';

// TODO
// - abstract the error handling into the common logging service
// - use the mutate format, with wrappers for update and create

@Injectable()
export class TiersService {
  private readonly logger = new Logger(TiersService.name);

  constructor(
    @InjectModel(Tier.name)
    private tierModel: TierModel,
  ) {}

  async findAll(): Promise<Tier[]> {
    try {
      return await this.tierModel.find().exec();
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async findOne(label: string): Promise<Tier> {
    const query: findOneQuery = { label };
    try {
      return await this.tierModel.findOne(query);
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async create(tier: Tier): Promise<Tier> {
    const createdTier = new this.tierModel(tier);
    try {
      return await createdTier.save();
    } catch (error) {
      // If it's a known Mongoose error then...
      if (error.type === MongooseError && error.name === 'ValidationError') {
        this.logger.warn(`MongoDB Validation error: ${error.message}`);
        // Clean it, and pass back something more generic
        throw new Error(`Error creating tier: ${error.message}`);
      }
      // Otherwise log the fact we haven't considered this type of error yet (agggh)
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async update(tier: Tier): Promise<Tier> {
    const updatedTier = new this.tierModel(tier);
    try {
      return await updatedTier.save();
    } catch (error) {
      // If it's a known Mongoose error then...
      if (error.type === MongooseError && error.name === 'ValidationError') {
        this.logger.warn(`MongoDB Validation error: ${error.message}`);
        // Clean it, and pass back something more generic
        throw new Error(`Error creating tier: ${error.message}`);
      }
      // Otherwise log the fact we haven't considered this type of error yet (agggh)
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }
}
