import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../database/entity.repository';

import { Member, MemberModel, MemberDocument } from './schema';

@Injectable()
export class MembersRepository extends EntityRepository<
  MemberDocument,
  Member
> {
  constructor(@InjectModel(Member.name) memberModel: MemberModel) {
    super(memberModel);
  }
}
