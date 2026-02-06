import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { USER_CANNOT_BE_DELETED } from './user.constants';
import { JwtAuthGuard } from '~/auth/guards/jwt.guard';
import { userEmail } from '~/decorators/user-email.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) {
      throw new HttpException(USER_CANNOT_BE_DELETED, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@userEmail() email: string) {
    return await this.userService.findUser(email);
  }
}
