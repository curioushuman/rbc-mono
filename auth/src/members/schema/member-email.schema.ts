import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailTypeEnum } from '../types/email-type.enum';

@Schema({ _id: false })
export class MemberEmail {
  constructor(email?: string) {
    this.email = email || null;
  }

  @Prop({ required: true })
  email!: string;

  @Prop({
    enum: Object.values(EmailTypeEnum),
    default: Object.values(EmailTypeEnum)[0],
  })
  type?: EmailTypeEnum;

  @Prop({ default: false })
  primary?: boolean;
}

export const MemberEmailSchema = SchemaFactory.createForClass(MemberEmail);
