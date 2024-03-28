import { Message } from '@/decorators/responseMessage.decorator';
import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('上传')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}
  staticConfig = this.configService.get('Static');
  @Post('file')
  @Message('上传成功')
  @ApiOperation({
    summary: '上传成功',
    requestBody: {
      description: '文件上传',
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // 拦截属性名为file的文件并上传
  upload(@UploadedFile() file: Express.Multer.File) {
    // file 为上传的文件对象
    if (!file) {
      throw new HttpException('请上传文件', 400);
    }

    return `${this.staticConfig['filePrefix']}${file.filename}`;
  }
}
