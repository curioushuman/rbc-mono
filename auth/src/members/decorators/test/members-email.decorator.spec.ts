import { plainToInstance, Expose } from 'class-transformer';
import {
  createMemberDto,
  updateMemberMember,
} from '../../test/stubs/member.stub';
import { MemberEmail } from '../../schema';
import { CreatePrimaryEmail, PrimaryEmail } from '../members-email.decorator';

class TestClass {
  @Expose()
  @PrimaryEmail()
  email: string;
}

class TestCreateClass {
  @Expose()
  @CreatePrimaryEmail()
  emails: MemberEmail[];
}

describe('members-email-decorator(s)', () => {
  describe('PrimaryEmail', () => {
    describe('When "Transform-ing from" an object with an array of MemberEmail', () => {
      test('then it should "Transform to" the MemberEmail.email marked as primary, as a string', () => {
        const member = updateMemberMember();
        const test = plainToInstance(TestClass, member);
        expect(test.email).toBe(updateMemberMember().emails[1].email);
      });
    });
  });
  describe('CreatePrimaryEmail', () => {
    describe('When "Transform-ing from" a DTO with an email as a string', () => {
      test('then it should "Transform to" a MemberEmail with a single MemberEmail marked as primary', () => {
        const test = plainToInstance(TestCreateClass, createMemberDto());
        expect(test.emails[0].email).toBe(createMemberDto().email);
        expect(test.emails[0].primary).toBe(true);
      });
    });
  });
});
