import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProductModel } from '~/product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, maxLength: 100 })
  title: string;

  @Prop({ type: String, required: true, maxLength: 300 })
  description: string;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: ProductModel.name, required: true })
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
