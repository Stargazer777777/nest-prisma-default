import { RoleEnum, Roles } from '@/decorators/role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // 注入Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Array<RoleEnum>>(
      Roles,
      context.getHandler(),
    ); // 从meta中获取角色信息

    const ctx = context.switchToHttp();

    // const req = ctx.getRequest<Request & { auth?: JwtData }>();

    // 检查用户角色是否具有访问权限
    // if (roles.includes(Role[req.auth.userRole])) return true;

    // 如果没有权限或权限不足，则抛出自定义的HTTP异常
    // throw new MyHttpException(401, '没有权限或权限不足');

    return true;
  }
}
