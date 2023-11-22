import { Global, Module } from '@nestjs/common';
import { DBClientService } from './dbClient.service';

@Module({
  providers: [DBClientService],
  exports: [DBClientService],
})
@Global()
export class DBClientModule {}
