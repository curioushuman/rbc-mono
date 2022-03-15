import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, PermissionsDto } from './dto';
import { Role } from './schema';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Get all roles
   */
  @Get()
  async get() {
    try {
      return await this.rolesService.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a role
   */
  @Get(':label')
  async getOne(@Param('label') label: string) {
    let role: Role;
    try {
      role = await this.rolesService.findOne(label);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  /**
   * Create a role
   */
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = plainToInstance(Role, createRoleDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.rolesService.create(role);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a role
   * NOTE: Currently not in use
   */
  @Put()
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    let role = await this.getOne(updateRoleDto.label);
    const roleFromDto = plainToInstance(Role, updateRoleDto, {
      excludeExtraneousValues: true,
    });
    merge(role, roleFromDto);
    try {
      role = await this.rolesService.update(role);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return role;
  }

  /**
   * Set permissions on a role
   */
  @Put('/permissions')
  async permissions(@Body() permissionsDto: PermissionsDto) {
    let role = await this.getOne(permissionsDto.label);
    const roleFromDto = plainToInstance(Role, permissionsDto, {
      excludeExtraneousValues: true,
    });
    merge(role, roleFromDto);
    try {
      role = await this.rolesService.update(role);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return role;
  }
}
