import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import type { Model } from 'mongoose';

import type { AuthDto } from '../auth/dto/auth.dto';
import { UserModel, type UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      password: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string, withPassword = false) {
    if (!email) {
      throw new UnauthorizedException(
        '[UserService]: email отсутствует в контексте пользователя',
      );
    }

    const query = this.userModel.findOne({ email });
    if (!withPassword) {
      query.select('-password');
    }

    return query.exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
