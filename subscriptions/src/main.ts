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
          groupId: configObject.microservices.services.subscriptions.groupId,
        },
      },
    },
  );

  // turned off for now
  // validation should occur on externally facing services
  // app.useGlobalPipes(new ValidationPipe());

  // Swagger; removed for now, will review this again later
  // const config = new DocumentBuilder()
  //   .setTitle('RbC Ecosystem : Subscriptions API')
  //   .setDescription('Subscriptions API')
  //   .setVersion('1.0')
  //   .addTag('agriculture')
  //   .build();
  // const options: SwaggerDocumentOptions = {
  //   operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  //   ignoreGlobalPrefix: true,
  // };
  // const document = SwaggerModule.createDocument(app, config, options);
  // SwaggerModule.setup('docs/api', app, document);

  app.listen();
}
bootstrap();
