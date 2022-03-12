export class UtilsConfig {
  public timeout: number;
  private errorMessage: string | undefined;

  constructor() {
    this.timeout = Number(process.env.KAFKA_TIMEOUT) || 5000;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public getError(): string | boolean {
    if (this.errorMessage === undefined) {
      return false;
    }
    return this.errorMessage;
  }
}
