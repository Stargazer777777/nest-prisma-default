import { ITokenPayload } from '@/typing/auth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const TokenPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx
      .switchToHttp()
      .getRequest<Request & { tokenPayload: ITokenPayload }>();
    return req.tokenPayload;
  },
);
