import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';

import { Action, Resource, Zone } from '../types';

@Schema({ _id: false })
export class Permission {
  @AutoMap()
  @Prop({
    required: true,
    type: String,
    enum: Object.values(Zone),
    default: Object.values(Zone)[0],
  })
  zone!: Zone;

  @AutoMap()
  @Prop({
    required: true,
    type: String,
    enum: Object.values(Resource),
    default: Object.values(Resource)[0],
  })
  resource!: Resource;

  @AutoMap()
  @Prop({
    required: true,
    type: String,
    enum: Object.values(Action),
    default: Object.values(Action)[0],
  })
  action!: Action;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
