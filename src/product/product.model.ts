import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristics {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;
}

@Schema({ timestamps: true })
export class ProductModel {
  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true, maxLength: 100 })
  title: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  oldPrice: number;

  @Prop({ type: Number })
  credit: number;

  @Prop({ type: Number })
  calculatedRating: number;

  @Prop({ type: String, required: true, maxLength: 300 })
  description: string;

  @Prop({ type: String, maxLength: 200 })
  advantages: string;

  @Prop({ type: String, maxLength: 200 })
  disadvantages: string;

  @Prop({ type: [String], required: true })
  categories: string[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [ProductCharacteristics], _id: false })
  characteristics: ProductCharacteristics[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
