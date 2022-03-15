import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  LoggableHttpMiddleware,
  configFactory,
  MongoDbModule,
} from '@curioushuman/rbc-common';

import { MembersModule } from './members/members.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RolesModule } from './roles/roles.module';
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
    ProfilesModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggableHttpMiddleware);
  }
}
