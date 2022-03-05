import { Injectable } from '@nestjs/common';

import { Member } from './schema';

@Injectable()
export class MembersEmailService {
  getPrimaryEmail(member: Member) {
    const primaryEmails = member.emails.filter((email) => email.primary);
    return primaryEmails.length ? primaryEmails[0] : null;
  }

  // setPrimaryEmail(member: Member, email: string) {}
}
