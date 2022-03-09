import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { Expose, Transform } from 'class-transformer';

@Schema()
export class Member {
  @Expose()
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  id!: string;

  @Transform(({ obj }) => 'overidden@transform.dto')
  @Expose()
  @Prop({ required: true })
  email!: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
export type MemberDocument = Member & Document;

export type MemberModel = Model<MemberDocument>;
