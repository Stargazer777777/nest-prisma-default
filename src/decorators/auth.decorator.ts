import { $Enums } from '@prisma/client';
import { AuthGuard } from '@/guards/auth.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from './role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: $Enums.user_role[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard), ApiBearerAuth());
}
