import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { Role } from './schema';
import { RolesRepository } from './roles.repository';
import { CreateRoleMap, UpdateRoleMap } from './mappers';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async find(): Promise<Role[]> {
    return await this.rolesRepository.find({});
  }

  async findOne(label: string): Promise<Role | null> {
    return await this.rolesRepository.findOne({ label });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // map DTO to DB structure
    const roleMapped = plainToInstance(CreateRoleMap, createRoleDto, {
      excludeExtraneousValues: true,
    });
    // convert to Role for saving
    let role = plainToInstance(Role, roleMapped);
    // save the role
    role = await this.save(role);
    // return the role
    return role;
  }

  async update(role: Role, updateRoleDto: UpdateRoleDto): Promise<Role> {
    // map DTO to DB structure
    const roleMapped = plainToInstance(UpdateRoleMap, updateRoleDto, {
      excludeExtraneousValues: true,
    });
    // merge the new info with the role
    role = this.merge(role, roleMapped);
    // save the role
    role = await this.save(role);
    // return the role
    return role;
  }

  async save(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }

  merge(role: Role, roleMapped: UpdateRoleMap): Role {
    return merge(role, roleMapped);
  }
}
