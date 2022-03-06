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
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { merge } from 'lodash';

import { TiersService } from './tiers.service';
import { CreateTierDto, UpdateTierDto } from './dto';
import { Tier } from './schema';

@Controller('tiers')
export class TiersController {
  constructor(
    private readonly tiersService: TiersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  /**
   * Get all tiers
   */
  @Get()
  async findAll() {
    try {
      return await this.tiersService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a tier
   */
  @Get(':label')
  async findOne(@Param('label') label: string) {
    let tier: Tier;
    try {
      tier = await this.tiersService.findOne(label);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!tier) {
      throw new NotFoundException('Tier not found');
    }
    return tier;
  }

  /**
   * Create a tier
   */
  @Post()
  async create(@Body() createTierDto: CreateTierDto) {
    console.log('createTierDto', createTierDto);
    const tier = this.mapper.map(createTierDto, Tier, CreateTierDto);
    console.log('tier', tier);
    try {
      return await this.tiersService.create(tier);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a tier
   * NOTE: Currently not in use
   */
  @Put()
  async update(@Body() updateTierDto: UpdateTierDto) {
    let tier = await this.findOne(updateTierDto.label);
    const tierFromDto = this.mapper.map(updateTierDto, Tier, UpdateTierDto);
    merge(tier, tierFromDto);
    try {
      tier = await this.tiersService.update(tier);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return tier;
  }
}
