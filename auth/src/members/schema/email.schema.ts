import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailType } from '../types/email-type.enum';

@Schema({ _id: false })
export class Email {
  constructor(email?: string) {
    this.email = email || null;
  }

  @Prop({ required: true })
  email!: string;

  @Prop({
    enum: Object.values(EmailType),
    default: Object.values(EmailType)[0],
  })
  type?: EmailType;

  @Prop({ default: false })
  primary?: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
