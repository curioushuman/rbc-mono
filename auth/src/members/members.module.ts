import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { CommonModule } from '@curioushuman/rbc-common';

@Module({
  imports: [CommonModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
