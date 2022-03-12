import { UtilsConfig } from './config';

export class KafkaUtilsConfig extends UtilsConfig {
  public brokers: string[];
  public groupId: string;

  constructor() {
    super();
    if (!this.checkEnv()) {
      return;
    }
    const broker = process.env.KAFKA_BROKERS || 'kafka-srv:9092';
    this.brokers = [broker];
    this.groupId = process.env.KAFKA_GROUPID || 'auth-consumer-server';
  }

  private checkEnv(): boolean {
    let env = true;
    if (!process.env.KAFKA_BROKERS) {
      this.setErrorMessage('No KAFKA brokers defined');
      env = false;
    }
    if (!process.env.KAFKA_GROUPID) {
      this.setErrorMessage('No KAFKA groupId defined');
      env = false;
    }
    return env;
  }
}
