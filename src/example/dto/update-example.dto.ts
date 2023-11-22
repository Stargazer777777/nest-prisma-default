import { PartialType } from '@nestjs/mapped-types';
import { CreateExampleDto } from './create-example.dto';
import { IsString } from 'class-validator';

export class UpdateExampleDto extends PartialType(CreateExampleDto) {
  @IsString()
  name: string;
}
