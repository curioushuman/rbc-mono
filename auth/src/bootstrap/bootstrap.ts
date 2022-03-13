import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import type { KafkaConfig } from '@curioushuman/rbc-common';
import { KafkaConsumerConfig } from '@curioushuman/rbc-common';

// TODO
// - better handling of ConfigService
// - move some of the bootstrap logic to common module

export class App {
  public static async start(module: any) {
    const app = await NestFactory.create(module);
    await App.setup(app);
  }

  public static async setup(app: INestApplication) {
    // instantiate config
    const configService = app.get(ConfigService);

    // setup microservices
    // await this.setupMicroservices(app, configService);

    // setup swagger
    this.setupSwagger(app);

    // global settings
    app.setGlobalPrefix('api/auth');
    app.useGlobalPipes(new ValidationPipe());

    // start listening
    const port = configService.get<string>('app.port') || 3000;
    await app.listen(port);
    console.log(`Listening on port ${port}`);
  }

  // public static async setupMicroservices(
  //   app: INestApplication,
  //   configService: ConfigService,
  // ) {
  // grab auth microservice config
  // const config = configService.get<KafkaConfig>(
  //   'microservices.services.auth',
  // );
  // add microservices
  // app.connectMicroservice(new KafkaConsumerConfig(config).get());
  // app.connectMicroservice(this.tmpConfig());
  // start the service
  // await app.startAllMicroservices();
  // }

  // TESTING
  // public static tmpConfig() {
  //   return {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['kafka-srv:9092'],
  //       },
  //     },
  //   };
  // }

  public static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('RbC Ecosystem : Auth & Members')
      .setDescription('Auth & members API')
      .setVersion('1.0')
      .addTag('authentication')
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
      ignoreGlobalPrefix: true,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs/api', app, document);
  }
}
