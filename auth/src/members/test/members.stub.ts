import { Member, MemberEmail } from '../schema';

const memAlphaEmail = {
  email: 'jake@bluesbrothers.com',
  type: 'WORK',
  primary: true,
} as MemberEmail;
const memAlphaEmailPers = {
  email: 'jakey@homeofblues.com',
  type: 'PERSONAL',
  primary: false,
} as MemberEmail;
export const memAlpha = {
  id: 'abc123',
  emails: [memAlphaEmail, memAlphaEmailPers],
  profile: {
    firstName: 'Jake',
    lastName: 'Blues',
  },
} as Member;

const memBetaEmail = {
  email: 'elwood@bluesbrothers.com',
  type: 'WORK',
  primary: true,
} as MemberEmail;
const memBetaEmailPers = {
  email: 'woody@homeofblues.com',
  type: 'PERSONAL',
  primary: false,
} as MemberEmail;
export const memBeta = {
  id: '456def',
  emails: [memBetaEmail, memBetaEmailPers],
  profile: {
    firstName: 'Elwood',
    lastName: 'Blues',
  },
} as Member;
