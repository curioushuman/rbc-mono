import { Injectable } from '@nestjs/common';

import { Member } from './schema';

@Injectable()
export class MembersEmailService {
  public static getPrimaryEmail(member: Member) {
    const primaryEmails = member.emails.filter((email) => email.primary);
    return primaryEmails.length ? primaryEmails[0].email : null;
  }

  // setPrimaryEmail(member: Member, email: string) {}
}
