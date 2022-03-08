import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { KafkaConfig } from '@curioushuman/rbc-common';
import { KafkaConsumerConfig } from '@curioushuman/rbc-common';

export class App {
  public static async start(module: any) {
    const app = await NestFactory.create(module);
    await App.setup(app);
  }

  public static async setup(app: INestApplication) {
    // grab config
    const configService = app.get(ConfigService);

    // grab subscriptions microservice config
    const config = configService.get<KafkaConfig>(
      'microservices.services.subscriptions',
    );

    // add microservices
    app.connectMicroservice(new KafkaConsumerConfig(config).get());

    // start the service
    await app.startAllMicroservices();
    const port = configService.get<string>('app.port') || 3000;
    await app.listen(port);
    console.log(`Listening on port ${port}`);
  }
}
