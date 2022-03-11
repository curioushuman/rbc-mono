import { UtilsConfig } from './config';

export class KafkaUtilsConfig extends UtilsConfig {
  public brokers: string[];
  public groupId: string;

  constructor() {
    super();
    const broker = process.env.KAFKA_BROKERS || 'kafka-srv:9092';
    this.brokers = [broker];
    this.groupId = process.env.KAFKA_GROUPID || 'auth-consumer-server';
  }
}
