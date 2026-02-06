import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const userEmail = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
