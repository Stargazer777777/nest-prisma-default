import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DBClientService {
  prisma = new PrismaClient();
}
