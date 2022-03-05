import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { AutoMap } from '@automapper/classes';

import { Email, EmailSchema, Profile } from './';

// * Key
// Member: Is a Nest.js class used to help build the schema, and act as your Type interface
// MemberSchema: Is the schema, that Mongoose uses to build the database
// MemberModel: Is the model, based on the schema, that Mongoose uses to interact with the database
// MemberDocument: Represents an instance of the model, a single document in the collection

// * Notes
// Validation, other than *required*, handled in DTOs

// For more info on Typescript & Mongoose see
// https://mongoosejs.com/docs/typescript/subdocuments.html

@Schema()
export class Member {
  // * IMPORTANT: We are overriding the default id field with our own custom field
  // https://mongoosejs.com/docs/guide.html#_id
  // We will be using the CRM ID for member records across the ecosystem
  @AutoMap()
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  crmId!: string;

  @Prop({ required: true, type: [EmailSchema] })
  emails!: Email[];

  // TODO: do not use the raw() method, use the Profile or ProfileSchema
  // I just need to spend more time here. Other priorities exist.
  // ! Error: Cannot determine a type for the "Member.profile" field
  // ! (union/intersection/ambiguous type was used). Make sure your property
  // ! is decorated with a "@Prop({ type: TYPE_HERE })" decorator.
  // @Prop({ type: ProfileSchema })
  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  profile: Profile;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
export type MemberDocument = Member & Document;

// TMethodsAndOverrides
// https://mongoosejs.com/docs/typescript/subdocuments.html#subdocument-arrays
type MemberDocumentProps = {
  emails: Types.DocumentArray<Email>;
  profile: Types.Subdocument<Types.ObjectId> & Profile;
};

// TQueryHelpers
// We don't use any at the moment, but needs to be passed to Model
type MemberQueryHelpers = Record<string, unknown>;

export type MemberModel = Model<
  MemberDocument,
  MemberQueryHelpers,
  MemberDocumentProps
>;
