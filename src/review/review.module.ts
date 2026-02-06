import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '~/auth/guards/jwt.guard';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
  ],
  providers: [ReviewService, JwtAuthGuard],
})
export class ReviewModule {}
