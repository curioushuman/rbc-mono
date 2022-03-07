import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';

export class App {
  public static async start(module: any) {
    const app = await NestFactory.create(module);
    await App.setup(app);
  }

  public static async setup(app: INestApplication) {
    // add microservices
    app.connectMicroservice({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka-srv:9092'],
        },
        consumer: {
          groupId: 'subscriptions-consumer',
        },
      },
    });

    // start the service
    await app.startAllMicroservices();
    await app.listen(3000);
  }
}
