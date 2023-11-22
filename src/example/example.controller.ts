import { RoleEnum } from './../decorators/role.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Message } from '@/decorators/responseMessage.decorator';
import { Auth } from '@/decorators/auth.decorator';
import { TokenPayload } from '@/decorators/tokenPayload.decorator';
import { ITokenPayload } from '@/typing/auth';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Message('创建成功')
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Get()
  findAll() {
    return this.exampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exampleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
    return this.exampleService.update(id, updateExampleDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.common)
  remove(@Param('id') id: string, @TokenPayload() tokenPayload: ITokenPayload) {
    console.log(tokenPayload);
    return this.exampleService.remove(id);
  }
}
