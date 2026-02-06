import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post('create')
  create(@Body() dto: Omit<ProductModel, '_id'>) {
    // TODO: implement product creation
    return { dto };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    // TODO: implement product retrieval
    return { id };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    // TODO: implement product deletion
    return { id };
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: ProductModel) {
    // TODO: implement product update
    return { id, dto };
  }

  @HttpCode(200)
  @Post()
  find(@Body() dto: FindProductDto) {
    // TODO: implement product search
    return { dto };
  }
}
