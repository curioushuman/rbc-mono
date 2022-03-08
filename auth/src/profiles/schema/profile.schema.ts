import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';

@Schema({ _id: false })
export class Profile {
  @AutoMap()
  @Prop()
  firstName: string;

  @AutoMap()
  @Prop()
  lastName: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
