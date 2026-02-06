import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

class HHData {
  @Prop({ type: Number })
  count: number;

  @Prop({ type: Number })
  juniorSalary: number;

  @Prop({ type: Number })
  middleSalary: number;

  @Prop({ type: Number })
  seniorSalary: number;
}

class TopPageAdvantage {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;
}

@Schema({ timestamps: true })
export class TopPageModel {
  @Prop({ type: String, enum: TopLevelCategory })
  firstLevelCategory: TopLevelCategory;

  @Prop({ type: String })
  secondLevelCategory: string;

  @Prop({ type: String, required: true, maxLength: 200 })
  title: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({
    type: HHData,
    _id: false,
  })
  hh?: HHData;

  @Prop({
    type: [TopPageAdvantage],
    _id: false,
  })
  advantages?: TopPageAdvantage[];

  @Prop({ type: String })
  seoText?: string;

  @Prop({ type: String })
  tags?: string;

  @Prop({ type: String })
  tagsTitle?: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
