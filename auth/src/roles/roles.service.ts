import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Role } from './schema';
import { RolesRepository } from './roles.repository';
import { CreateRoleMap, UpdateRoleMap } from './mappers';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async find(): Promise<Role[]> {
    return await this.rolesRepository.find({});
  }

  async findOne(label: string): Promise<Role> {
    return await this.rolesRepository.findOne({ label });
  }

  create(createRoleMap: CreateRoleMap): Promise<Role> {
    const role = plainToInstance(Role, createRoleMap);
    return this.save(role);
  }

  update(updateRoleMap: UpdateRoleMap): Promise<Role> {
    const role = plainToInstance(Role, updateRoleMap);
    return this.save(role);
  }

  async save(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }
}
