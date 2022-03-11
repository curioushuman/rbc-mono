import axios from 'axios';

import { ApiUtilsConfig } from '../config/api.config';
import { Checker } from '../types/checker';

export class ApiChecker extends Checker<ApiUtilsConfig> {
  constructor(config: ApiUtilsConfig = new ApiUtilsConfig()) {
    super();
    this.config = config;
    this.checkerType = 'API';
  }

  async setup(): Promise<void> {
    // DO NOTHING
  }

  async checkConnect(): Promise<boolean> {
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
