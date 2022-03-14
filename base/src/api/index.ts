import axios from 'axios';

import { ApiUtilsConfig } from '../config/api.config';
import { Checker } from '../types/checker';

export class ApiChecker extends Checker<ApiUtilsConfig> {
  constructor(uri?: string) {
    super();
    const uriBase = uri || process.env.API_URI;
    this.checkerType = 'API';
    if (uriBase) {
      this.setConfig(new ApiUtilsConfig(uriBase));
    }
  }

  async setup(): Promise<void> {
    // DO NOTHING
  }

  async checkConnect(): Promise<boolean> {
    console.log('Try:', this.config.uri);
    try {
      const { data } = await axios.get(this.config.uri);
      console.log(data);
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }
}
