import { UtilsConfig } from './config';

// UP TO
// made the fix below
// need to add tests throughout

export class ApiUtilsConfig extends UtilsConfig {
  public uri: string;

  constructor(uri?: string) {
    super();
    const uriBase = uri || process.env.API_URI;
    if (!uriBase) {
      this.setErrorMessage('No API URI defined');
      return;
    }
    this.uri = `${uriBase}/hello`;
  }
}
