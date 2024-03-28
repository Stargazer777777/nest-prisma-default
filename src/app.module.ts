import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import getConfig from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { DBClientModule } from './dbClient/dbClient.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const config = getConfig();
const JwtConfig = config['JWT'];
const projectRootPath = config['ProjectRootPath'];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getConfig] }),
    JwtModule.register({
      global: true,
      secret: JwtConfig['secret'],
      signOptions: { expiresIn: JwtConfig['expiresIn'] },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(projectRootPath, 'uploaded_files'),
      serveRoot: '/uploaded_files',
    }),
    DBClientModule,
    ExampleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
