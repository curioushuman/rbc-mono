import { Kafka, Consumer } from 'kafkajs';

import { KafkaUtilsConfig } from '../config/kafka.config';
import { Checker } from '../types/checker';

export class KafkaChecker extends Checker<KafkaUtilsConfig> {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(config: KafkaUtilsConfig = new KafkaUtilsConfig()) {
    super();
    this.config = config;
    this.checkerType = 'KAFKA';
  }

  async setup(): Promise<void> {
    this.setupKafka();
    this.setupConsumer();
  }

  async checkConnect(): Promise<boolean> {
    try {
      await this.consumer.connect();
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

  private setupKafka(): void {
    try {
      this.kafka = new Kafka({
        clientId: 'test-consumer',
        brokers: this.config.brokers,
        connectionTimeout: this.config.timeout,
        retry: {
          retries: 0,
        },
      });
    } catch (error) {
      this.returnFalse();
    }
  }

  private setupConsumer(): void {
    try {
      this.consumer = this.kafka.consumer({
        groupId: this.config.groupId,
        sessionTimeout: this.config.timeout,
      });
    } catch (error) {
      this.returnFalse();
    }
  }
}
