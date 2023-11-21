import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { ConfigModule } from '@nestjs/config';
import getConfig from './config/configuration';

@Module({
  imports: [
    ExampleModule,
    ConfigModule.forRoot({ isGlobal: true, load: [getConfig] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
