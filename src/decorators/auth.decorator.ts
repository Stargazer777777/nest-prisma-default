import { AuthGuard } from '@/guards/auth.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum, Roles } from './role.decorator';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard));
}
