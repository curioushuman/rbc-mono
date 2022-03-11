import { Kafka, Consumer } from 'kafkajs';

import { KafkaUtilsConfig } from '../config/kafka.config';

export class KafkaCheck {
  private kafka: Kafka;
  private consumer: Consumer;
  constructor(private config: KafkaUtilsConfig = new KafkaUtilsConfig()) {}

  public async check(): Promise<void> {
    this.setupKafka();
    this.setupConsumer();
    const healthy = await this.checkConnect();
    if (healthy) {
      console.log('Kafka ready');
      process.exit();
    } else {
      console.log('!!!Kafka NOT ready!!!');
      process.exit(1);
    }
  }

  public async checkConnect(): Promise<boolean> {
    try {
      await this.consumer.connect();
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

  public setupKafka(): void {
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
      // console.log(error);
      process.exit();
    }
  }

  public setupConsumer(): void {
    try {
      this.consumer = this.kafka.consumer({
        groupId: this.config.groupId,
        sessionTimeout: this.config.timeout,
      });
    } catch (error) {
      // console.log(error);
      process.exit();
    }
  }
}
