import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  LoggableHttpMiddleware,
  MongoDbModule,
  configFactory,
} from '@curioushuman/rbc-common';

import { TiersModule } from './tiers/tiers.module';
import { MembersModule } from './members/members.module';
import { AppController } from './root/app.controller';
import { AppService } from './root/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
      isGlobal: true,
    }),
    MongoDbModule,
    MembersModule,
    TiersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggableHttpMiddleware);
  }
}
