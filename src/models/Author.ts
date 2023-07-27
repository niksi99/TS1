import mongoose, { Document, Schema } from "mongoose";

export interface IAthor {
  name: string;
}

export interface IAthorModel extends IAthor, Document {}

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IAthorModel>("Author", AuthorSchema);
