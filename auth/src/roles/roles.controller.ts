import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SerializeInterceptor } from '@curioushuman/rbc-common';

import { RolesService } from './roles.service';
import { CreateRoleDto, RoleExternalDto, UpdateRoleDto } from './dto';
import { Role } from './schema';
import { plainToInstance } from 'class-transformer';
import { CreateRoleMap, UpdateRoleMap } from './mappers';

@SerializeInterceptor(RoleExternalDto)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

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
    // map DTO to DB structure
    const roleMapped = plainToInstance(CreateRoleMap, createRoleDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.rolesService.create(roleMapped);
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
    const role = await this.getOne(label);
    // map DTO to DB structure
    const roleMapped = plainToInstance(UpdateRoleMap, updateRoleDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.rolesService.update(role, roleMapped);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Set permissions on a role
   * ! Decommissioned until I'm in a place to test it
   * * Also needs to be updated to match update()
   *
   * You might need to loop through the permissions, and convert them individually
   */
  // @Put('/permissions/:label')
  // async permissions(
  //   @Param('label') label: string,
  //   @Body() permissionsDto: PermissionsDto,
  // ) {
  //   let role = await this.getOne(label);
  //   const roleMapped = plainToInstance(PermissionsMap, permissionsDto, {
  //     excludeExtraneousValues: true,
  //   });
  //   merge(role, roleMapped);
  //   try {
  //     role = await this.rolesService.update(role);
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  //   return role;
  // }
}
