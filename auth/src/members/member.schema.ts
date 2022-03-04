import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';

// * Key
// Member: Is a Nest.js class used to help build the schema, and act as your Type interface
// MemberSchema: Is the schema, that Mongoose uses to build the database
// MemberModel: Is the model, based on the schema, that Mongoose uses to interact with the database
// MemberDocument: Represents an instance of the model, a single document in the collection

// * Notes
// Validation, other than *required*, handled in DTOs

// For more info on Typescript & Mongoose see
// https://mongoosejs.com/docs/typescript/subdocuments.html

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

@Schema()
export class Member {
  // * IMPORTANT: We are overriding the default id field with our own custom field
  // https://mongoosejs.com/docs/guide.html#_id
  // We will be using the CRM ID for member records across the ecosystem
  @Prop({ required: true })
  _id!: string;

  // @Prop({ required: true })
  // primaryEmail: string;

  // @Prop(
  //   raw({
  //     email: { type: String },
  //     type: { type: String, enum: ['WORK', 'PERSONAL', 'OTHER'] },
  //     primary: { type: Boolean },
  //   }),
  // )
  // emails: Record<string, any>;

  // @Prop()
  // emails: Email[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
export type MemberDocument = Member & Document;

// TMethodsAndOverrides
// https://mongoosejs.com/docs/typescript/subdocuments.html#subdocument-arrays
type MemberDocumentProps = {
  names: Types.DocumentArray<Email>;
};

// TQueryHelpers
type MemberQueryHelpers = Record<string, unknown>;

export type MemberModel = Model<
  MemberDocument,
  MemberQueryHelpers,
  MemberDocumentProps
>;
