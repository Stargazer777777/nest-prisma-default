import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendEmailCodeDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
