import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpLoggerMiddleware, configFactory } from '@curioushuman/rbc-common';

import { TiersModule } from './tiers/tiers.module';
import { AppController } from './root/app.controller';
import { AppService } from './root/app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
      isGlobal: true,
    }),
    DatabaseModule,
    TiersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware);
  }
}
