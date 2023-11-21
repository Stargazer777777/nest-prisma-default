import { Reflector } from '@nestjs/core';

export enum RoleEnum {
  common,
  admin,
}

export const Roles = Reflector.createDecorator<RoleEnum[]>();
