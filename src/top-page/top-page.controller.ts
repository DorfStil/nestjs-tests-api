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
import type { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly configService: ConfigService) {}

  @Post('create')
  create(@Body() dto: Omit<TopPageModel, ''>) {
    // TODO: implement top-page creation; example config access retained for future use
    const test = this.configService.get('TEST');
    return { dto, test };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    // TODO: implement top-page retrieval
    return { id };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    // TODO: implement top-page deletion
    return { id };
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    // TODO: implement top-page update
    return { id, dto };
  }

  @HttpCode(200)
  @Post()
  find(@Body() dto: FindTopPageDto) {
    // TODO: implement top-page search
    return { dto };
  }
}
