import { readFile } from 'fs/promises';

import { ApiUtilsConfig } from '../config/api.config';
import { ApiChecker } from '../api';

export enum Services {
  Auth = 'auth',
  Subscriptions = 'subscriptions',
}

export class ServiceChecker extends ApiChecker {
  constructor(private service: Services) {
    super();
    this.checkerType = 'SERVICE';
  }

  async setup(): Promise<void> {
    const uri = await this.localUri();
    this.setConfig(new ApiUtilsConfig(uri));
  }

  private async localUri(): Promise<string> {
    const namespace = await this.getNamespace();
    return `${this.service}.${namespace}.svc.cluster.local`;
  }

  private async getNamespace(): Promise<string> {
    try {
      return await readFile(
        '/var/run/secrets/kubernetes.io/serviceaccount/namespace',
        'utf8',
      );
    } catch (error) {
      console.log('Could not read Kubernetes namespace file');
      this.returnFalse();
    }
  }
}
