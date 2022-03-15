import { Injectable } from '@nestjs/common';

import { Role } from './schema';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async find(): Promise<Role[]> {
    return await this.rolesRepository.find({});
  }

  async findOne(label: string): Promise<Role> {
    return await this.rolesRepository.findOne({ label });
  }

  create(role: Role): Promise<Role> {
    return this.save(role);
  }

  update(role: Role): Promise<Role> {
    return this.save(role);
  }

  async save(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }
}
