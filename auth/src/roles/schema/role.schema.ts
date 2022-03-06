import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { AutoMap } from '@automapper/classes';

import { Permission, PermissionSchema } from '.';

// TODO
// - Add versioning to the Roles
//   - And make a relationship between each new version and the previous (or master)

// * Key
// Role: Is a Nest.js class used to help build the schema, and act as your Type interface
// RoleSchema: Is the schema, that Mongoose uses to build the database
// RoleModel: Is the model, based on the schema, that Mongoose uses to interact with the database
// RoleDocument: Represents an instance of the model, a single document in the collection

// * Notes
// Validation, other than *required*, handled in DTOs

// For more info on Typescript & Mongoose see
// https://mongoosejs.com/docs/typescript/subdocuments.html

@Schema()
export class Role {
  @AutoMap()
  @Prop({ required: true, unique: true })
  label!: string;

  @AutoMap({ typeFn: () => Permission })
  @Prop({ type: [PermissionSchema] })
  permissions!: Permission[];

  /**
   * An identifier for a SubscriptionType (from Subscription Service)
   */
  @AutoMap()
  @Prop()
  subscriptionTypeId?: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = Role & Document;

// TMethodsAndOverrides
// https://mongoosejs.com/docs/typescript/subdocuments.html#subdocument-arrays
type RoleDocumentProps = {
  emails: Types.DocumentArray<Permission>;
};

// TQueryHelpers
// We don't use any at the moment, but needs to be passed to Model
type RoleQueryHelpers = Record<string, unknown>;

export type RoleModel = Model<
  RoleDocument,
  RoleQueryHelpers,
  RoleDocumentProps
>;
