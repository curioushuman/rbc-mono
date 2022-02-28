import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { UpdateMemberStatusDto } from './dto/update-member-status.dto';
import { Member } from './member.model';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  getMembers(@Query() filterDto: GetMembersFilterDto): Member[] {
    if (Object.keys(filterDto).length) {
      return this.membersService.getMembersWithFilters(filterDto);
    } else {
      return this.membersService.getAllMembers();
    }
  }

  @Get('/:id')
  getMemberById(@Param('id') id: string): Member {
    return this.membersService.getMemberById(id);
  }

  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto): Member {
    return this.membersService.createMember(createMemberDto);
  }

  @Delete('/:id')
  deleteMember(@Param('id') id: string): void {
    return this.membersService.deleteMember(id);
  }

  @Patch('/:id/status')
  updateMemberStatus(
    @Param('id') id: string,
    @Body() updateMemberStatusDto: UpdateMemberStatusDto,
  ): Member {
    const { status } = updateMemberStatusDto;
    return this.membersService.updateMemberStatus(id, status);
  }
}
