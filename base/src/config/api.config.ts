import { UtilsConfig } from './config';

// UP TO
// made the fix below
// need to add tests throughout

export class ApiUtilsConfig extends UtilsConfig {
  public uri: string;

  constructor(uri: string) {
    super();
    this.uri = `${uri}/hello`;
  }
}
