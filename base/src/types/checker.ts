import { UtilsConfig } from '..//config/config';

export abstract class Checker<C extends UtilsConfig> {
  protected config: C;
  protected checkerType: string;

  protected abstract setup(): Promise<void>;
  protected abstract checkConnect(): Promise<boolean>;

  public setConfig(config: C): void {
    this.config = config;
  }

  public getConfigValue(key: string): string {
    return this.config[key];
  }

  public async check(): Promise<void> {
    await this.setup();
    this.checkError();
    const healthy = await this.checkConnect();
    if (healthy) {
      this.returnTrue();
    } else {
      this.returnFalse();
    }
  }

  protected checkError(): void {
    const errMsg = this.config.getError();
    if (errMsg === false) {
      return;
    }
    console.log(errMsg);
    this.returnFalse();
  }

  protected returnTrue(): void {
    console.log(`${this.checkerType} ready`);
    process.exit();
  }

  protected returnFalse(): void {
    console.log(`!!!${this.checkerType}  NOT ready!!!`, this.config);
    process.exit(1);
  }
}
