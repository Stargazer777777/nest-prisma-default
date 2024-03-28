import { $Enums } from '@prisma/client';
import { Roles } from '@/decorators/role.decorator';
import { ITokenPayload } from '@/typing/auth';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {} // 注入Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Array<$Enums.user_role>>(
      Roles,
      context.getHandler(),
    ); // 从meta中获取角色信息

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<
      Request & { tokenPayload?: ITokenPayload }
    >();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const jwtConfig = this.configService.get('JWT');
    try {
      const payload: ITokenPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig['secret'],
      });
      request.tokenPayload = payload;
      if (!roles.includes(payload.role)) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
