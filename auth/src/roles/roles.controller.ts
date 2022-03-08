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
import { InjectMapper } from '@automapper/nestjs';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { Mapper } from '@automapper/core';
import { merge } from 'lodash';

import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, PermissionsDto } from './dto';
import { Role } from './schema';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    @InjectMapper() private mapper: Mapper,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Get all roles
   */
  @Get()
  async findAll() {
    try {
      return await this.rolesService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a role
   */
  @Get(':label')
  async findOne(@Param('label') label: string) {
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
    console.log('createRoleDto', createRoleDto);
    const role = this.mapper.map(createRoleDto, Role, CreateRoleDto);
    console.log('role', role);
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
    let role = await this.findOne(updateRoleDto.label);
    const roleFromDto = this.mapper.map(updateRoleDto, Role, UpdateRoleDto);
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
    let role = await this.findOne(permissionsDto.label);
    const roleFromDto = this.mapper.map(permissionsDto, Role, PermissionsDto);
    merge(role, roleFromDto);
    try {
      role = await this.rolesService.update(role);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return role;
  }
}
