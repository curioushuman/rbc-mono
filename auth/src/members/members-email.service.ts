import { Injectable } from '@nestjs/common';

import { Member, MemberEmail } from './schema';

// UP TO TESTING THIS and decorator

@Injectable()
export class MembersEmailService {
  /**
   * If people change their email, it becomes the new primary
   * We want to hold on to their old emails though, for CRM checking etc
   */
  static mergePrimaryEmail(member: Member, primaryEmail: string): void {
    if (!member.emails || member.emails.length === 0) {
      member.emails = [MembersEmailService.createPrimaryEmail(primaryEmail)];
    }
    member.emails = MembersEmailService.updatePrimaryEmail(
      member.emails,
      primaryEmail,
    );
  }

  static updatePrimaryEmail(
    emails: MemberEmail[],
    primaryEmail: string,
  ): MemberEmail[] {
    // reset all emails to not primary
    let primaryExists = false;
    emails = emails.map((email) => {
      email.primary = false;
      if (email.email === primaryEmail) {
        email.primary = true;
        primaryExists = true;
      }
      return email;
    });
    if (!primaryExists) {
      emails.push(MembersEmailService.createPrimaryEmail(primaryEmail));
    }
    return emails;
  }

  static createPrimaryEmail(email: string): MemberEmail {
    const primaryEmail: MemberEmail = {
      email,
      primary: true,
    };
    return primaryEmail;
  }

  static getPrimaryEmail(member: Member): string | null {
    if (!member.emails) {
      return null;
    }
    const primaryEmails = member.emails.filter((email) => email.primary);
    return primaryEmails.length ? primaryEmails[0].email : null;
  }
}
