import { UtilsConfig } from './config';

export class ApiUtilsConfig extends UtilsConfig {
  public uri: string;

  constructor() {
    super();
    this.uri = process.env.API_URI || '/api/auth/common/ready';
  }
}
