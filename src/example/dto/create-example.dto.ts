import { IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  id: string;
}
