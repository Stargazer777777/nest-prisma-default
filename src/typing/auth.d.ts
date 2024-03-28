import { $Enums } from '@prisma/client';

export interface ITokenPayload {
  id: string;
  role: $Enums.user_role;
}
