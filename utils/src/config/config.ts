// TODO
// - accept multiple brokers from ENV vars

export class UtilsConfig {
  public timeout: number;

  constructor() {
    this.timeout = Number(process.env.KAFKA_TIMEOUT) || 5000;
  }
}
