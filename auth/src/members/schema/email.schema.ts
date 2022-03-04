enum EmailType {
  Work = 'WORK',
  Personal = 'PERSONAL',
  Other = 'OTHER',
}

export interface Email {
  email: string;
  type: EmailType;
  primary: boolean;
}
