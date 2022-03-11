import { UtilsConfig } from './config';

export class ApiUtilsConfig extends UtilsConfig {
  public uri: string;

  constructor() {
    super();
    this.uri = process.env.API_URI || 'http://rbc.dev/api/auth/common/ready';
  }
}
