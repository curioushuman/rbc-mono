import { Transport, KafkaOptions } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import type { KafkaConfig } from '@curioushuman/rbc-common';

// TODO
// - SSL and SASL
// - bring in production from ENV variable from common-config

export class KafkaConsumerConfig {
  private readonly options: { name: string } & KafkaOptions;

  constructor(private kafkaConfig: KafkaConfig) {
    // const kafka = new KafkaConfig();
    const productionTmp = false;

    this.options = {
      name: kafkaConfig.name,
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: kafkaConfig.clientId,
          brokers: kafkaConfig.brokers,
          // ssl: productionTmp,
          // sasl: productionTmp ? kafka.sasl : undefined,
          logLevel: productionTmp ? logLevel.ERROR : logLevel.INFO,
        },
        consumer: {
          groupId: kafkaConfig.groupId,
        },
      },
    };
  }

  public get(): { name: string } & KafkaOptions {
    return this.options;
  }
}
