import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { DBClientService } from '@/dbClient/dbClient.service';

@Injectable()
export class ExampleService {
  constructor(private readonly dbClientService: DBClientService) {}

  db = this.dbClientService.prisma;

  async create(createExampleDto: CreateExampleDto) {
    return await this.db.example.create({
      data: { name: createExampleDto.name },
    });
  }

  async findAll() {
    return await this.db.example.findMany();
  }

  async findOne(id: string) {
    return await this.db.example.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateExampleDto: UpdateExampleDto) {
    return await this.db.example.update({
      data: { name: updateExampleDto.name },
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.db.example.delete({ where: { id } });
  }
}
