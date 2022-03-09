import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';

import { Role, RoleModel } from './schema';
import { findOneQuery } from './types';

// TODO
// - abstract the error handling into the common logging service
// - use the mutate format, with wrappers for update and create

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectModel(Role.name)
    private roleModel: RoleModel,
  ) {}

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleModel.find().exec();
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async findOne(label: string): Promise<Role> {
    const query: findOneQuery = { label };
    try {
      return await this.roleModel.findOne(query);
    } catch (error) {
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async create(role: Role): Promise<Role> {
    const createdRole = new this.roleModel(role);
    try {
      return await createdRole.save();
    } catch (error) {
      // If it's a known Mongoose error then...
      if (error.type === MongooseError && error.name === 'ValidationError') {
        this.logger.warn(`MongoDB Validation error: ${error.message}`);
        // Clean it, and pass back something more generic
        throw new Error(`Error creating role: ${error.message}`);
      }
      // Otherwise log the fact we haven't considered this type of error yet (agggh)
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }

  async update(role: Role): Promise<Role> {
    const updatedRole = new this.roleModel(role);
    try {
      return await updatedRole.save();
    } catch (error) {
      // If it's a known Mongoose error then...
      if (error.type === MongooseError && error.name === 'ValidationError') {
        this.logger.warn(`MongoDB Validation error: ${error.message}`);
        // Clean it, and pass back something more generic
        throw new Error(`Error creating role: ${error.message}`);
      }
      // Otherwise log the fact we haven't considered this type of error yet (agggh)
      this.logger.warn(`AS YET UNHANDLED error: ${error.message}`);
      throw error;
    }
  }
}
