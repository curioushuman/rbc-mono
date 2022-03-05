import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

// TODO
// - move swagger to common
// - use config for port, move this to common
// - move whatever else you can over to common

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/auth');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('RbC Ecosystem')
    .setDescription(
      'Monorepo that gathers all the code for the RbC-Microservices + Apps Kubernetes cluster.',
    )
    .setVersion('1.0')
    .addTag('agriculture')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs/api', app, document);

  await app.listen(3000);
}
bootstrap();
