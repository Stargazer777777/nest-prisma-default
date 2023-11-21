import { RoleEnum } from '@/decorators/role.decorator';

export interface ITokenPayload {
  id: string;
  name: string;
  role: RoleEnum;
}
