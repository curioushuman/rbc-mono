import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { LoggableLogger } from '@curioushuman/rbc-common';

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
    // i.e. what are we listening out for?
    await this.setupMicroservices(app, configService);

    // setup swagger
    this.setupSwagger(app);

    // global settings
    app.setGlobalPrefix('api/subscriptions');
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(new LoggableLogger());

    // start listening
    const port = configService.get<string>('app.port') || 3001;
    const release = configService.get<string>('app.release');
    const namespace = configService.get<string>('app.namespace');
    await app.listen(port);
    console.log(`${release}, listening on port ${port} within ${namespace}`);
  }

  public static async setupMicroservices(
    app: INestApplication,
    configService: ConfigService,
  ) {
    const servers = configService.get<string[]>('nats.options.servers');
    if (!servers || servers.length === 0) {
      return;
    }
    app.connectMicroservice({
      transport: Transport.NATS,
      options: {
        servers: servers,
        debug: true,
      },
    });

    console.log(`Microservice connected via ${servers[0]}`);

    // start the service
    await app.startAllMicroservices();
  }

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
