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

import { TiersService } from './tiers.service';
import { CreateTierDto, UpdateTierDto } from './dto';
import { Tier } from './schema';
import { SerializeInterceptor } from '@curioushuman/rbc-common';
import { TierExternalDto } from './dto/tier-external.dto';

@SerializeInterceptor(TierExternalDto)
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
    try {
      return await this.tiersService.create(createTierDto);
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
    const tier = await this.getOne(label);
    try {
      return await this.tiersService.update(tier, updateTierDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
