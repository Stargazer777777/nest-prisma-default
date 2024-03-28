import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailCodeDto } from './dto/sendEmailCode.dto';
import { Message } from '@/decorators/responseMessage.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags('邮件服务')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Message('发送成功')
  @HttpCode(200)
  @Post('sendEmailCode')
  @ApiOperation({ summary: '发送邮箱验证码' })
  async sendEmailCode(@Body() dto: SendEmailCodeDto) {
    await this.emailService.sendEmailCode(dto.email);
  }
}
