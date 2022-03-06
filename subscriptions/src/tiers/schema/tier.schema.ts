import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { AutoMap } from '@automapper/classes';

@Schema()
export class Tier {
  @AutoMap()
  @Prop({ required: true, unique: true })
  label!: string;
}

export const TierSchema = SchemaFactory.createForClass(Tier);
export type TierDocument = Tier & Document;

export type TierModel = Model<TierDocument>;
