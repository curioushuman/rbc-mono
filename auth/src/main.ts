import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { configObject } from '@curioushuman/rbc-common';

import { AppModule } from './app.module';

// TODO
// - move swagger to common
// - move whatever else you can over to common

// * NOTES
// - accessing configObject from rbc-common is working around the ConfigService DI method (which relies on app)

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: configObject.microservices.transport,
      options: {
        client: {
          brokers: [configObject.microservices.broker],
        },
        consumer: {
          groupId: configObject.microservices.services.auth.groupId,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
