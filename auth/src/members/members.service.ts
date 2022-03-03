import { Injectable } from '@nestjs/common';
import { CommonService } from '@curioushuman/rbc-common';

@Injectable()
export class MembersService {
  constructor(private commonService: CommonService) {}

  getHello(): string {
    return this.commonService.getHello();
  }
}
