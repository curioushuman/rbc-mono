import { UtilsConfig } from './config';

export class KafkaUtilsConfig extends UtilsConfig {
  public brokers: string[];
  public groupId: string;

  constructor() {
    super();
    this.brokers = [process.env.KAFKA_BROKER] || ['kafka-srv:9092'];
    this.groupId = process.env.KAFKA_GROUPID || 'auth-consumer-server';
  }
}
