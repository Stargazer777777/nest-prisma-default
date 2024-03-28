import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import getConfig from '@/config/configuration';

const config = getConfig();
const rootPath = config['ProjectRootPath'];

@Module({
  imports: [
    // 注册上传模块
    MulterModule.register({
      storage: diskStorage({
        // 存放到本地
        destination: join(rootPath, 'uploaded_files'), // 存放路径
        filename: (req, file, callback) => {
          // 动态创建文件名
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          if (file.mimetype.indexOf('image') != -1) {
            return callback(null, fileName);
          }
          return callback(new Error('不是有效的格式'), null);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
