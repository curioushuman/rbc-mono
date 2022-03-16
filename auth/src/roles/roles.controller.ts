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
import { CreateRoleDto, RoleExternalDto, UpdateRoleDto } from './dto';
import { CreateRoleMap, UpdateRoleMap } from './mappers';
import { Role } from './schema';
import { SerializeInterceptor } from '../interceptors';

@SerializeInterceptor(RoleExternalDto)
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService, // @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Get all roles
   */
  @Get()
  async get() {
    try {
      const roles = await this.rolesService.find();
      return roles;
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
    const roleFromDto = plainToInstance(CreateRoleMap, createRoleDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.rolesService.create(roleFromDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a role
   * NOTE: Currently not in use
   */
  @Put(':label')
  async update(
    @Param('label') label: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    let role = await this.getOne(label);
    const roleFromDto = plainToInstance(UpdateRoleMap, updateRoleDto, {
      excludeExtraneousValues: true,
    });
    merge(role, roleFromDto);
    try {
      role = await this.rolesService.update(roleFromDto);
      return role;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Set permissions on a role
   * ! Decommissioned until I'm in a place to test it
   *
   * You might need to loop through the permissions, and convert them individually
   */
  // @Put('/permissions/:label')
  // async permissions(
  //   @Param('label') label: string,
  //   @Body() permissionsDto: PermissionsDto,
  // ) {
  //   let role = await this.getOne(label);
  //   const roleFromDto = plainToInstance(PermissionsMap, permissionsDto, {
  //     excludeExtraneousValues: true,
  //   });
  //   merge(role, roleFromDto);
  //   try {
  //     role = await this.rolesService.update(role);
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  //   return role;
  // }
}
