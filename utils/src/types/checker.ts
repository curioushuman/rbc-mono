export abstract class Checker<C> {
  protected config: C;
  protected checkerType: string;

  protected abstract setup(): Promise<void>;
  protected abstract checkConnect(): Promise<boolean>;

  public async check(): Promise<void> {
    await this.setup();
    const healthy = await this.checkConnect();
    if (healthy) {
      this.returnTrue();
    } else {
      this.returnFalse();
    }
  }

  protected returnTrue(): void {
    console.log('API ready');
    process.exit();
  }

  protected returnFalse(): void {
    console.log('!!!API NOT ready!!!', this.config);
    process.exit(1);
  }
}