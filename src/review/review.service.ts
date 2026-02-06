import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewModel } from './review.model';
import { Types, type Model } from 'mongoose';
import type { CreateReviewDto } from './dto/create-review.dto';
import type { ReviewDocument } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    const productObjectId = new Types.ObjectId(dto.productId);

    // Persist productId as ObjectId to keep queries consistent
    return this.reviewModel.create({
      ...dto,
      productId: productObjectId,
    });
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    const id = new Types.ObjectId(productId);

    return this.reviewModel
      .find({
        productId: id,
      })
      .exec();
  }

  async findAll(): Promise<ReviewDocument[]> {
    return this.reviewModel.find().exec();
  }

  async deleteByProductId(productId: string) {
    const id = new Types.ObjectId(productId);

    return this.reviewModel.deleteMany({ productId: id }).exec();
  }
}
