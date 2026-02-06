import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';

import { PASSWORD_IS_WRONG, USER_NOT_FOUND } from './auth.constants';
import type { AuthDto } from './dto/auth.dto';
import type { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  findUser(email: string, withPassword = false) {
    return this.userService.findUser(email, withPassword);
  }

  createUser(dto: AuthDto) {
    return this.userService.createUser(dto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userService.findUser(email, true);
    if (!user) throw new UnauthorizedException(USER_NOT_FOUND);
    const isPasswordPassed = await compare(password, user.password);
    if (!isPasswordPassed) throw new UnauthorizedException(PASSWORD_IS_WRONG);
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
