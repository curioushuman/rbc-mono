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
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { TiersService } from './tiers.service';
import { CreateTierDto, UpdateTierDto } from './dto';
import { CreateTierMap, UpdateTierMap } from './mappers';
import { Tier } from './schema';

@Controller('tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  /**
   * Get all tiers
   */
  @Get()
  async get() {
    try {
      return await this.tiersService.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a tier
   */
  @Get(':label')
  async getOne(@Param('label') label: string) {
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
    const tier = plainToInstance(CreateTierMap, createTierDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.tiersService.create(tier);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a tier
   */
  @Put(':label')
  async update(
    @Param('label') label: string,
    @Body() updateTierDto: UpdateTierDto,
  ) {
    let tier = await this.getOne(label);
    const tierFromDto = plainToInstance(UpdateTierMap, updateTierDto, {
      excludeExtraneousValues: true,
    });
    merge(tier, tierFromDto);
    try {
      tier = await this.tiersService.update(tier);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return tier;
  }
}
