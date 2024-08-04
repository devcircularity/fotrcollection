import { Schema, model, Document } from 'mongoose';

const { String } = Schema.Types;

export interface CategoryDocument extends Document {
  name: string;
  imageURL: string;
}

const CategorySchema = new Schema(
  {
    name: String,
    imageURL: String,
  },
  {
    timestamps: true,
  }
);

export const Category = model<CategoryDocument>('Category', CategorySchema);
