import { readFile } from 'fs/promises';
import { lookup } from 'dns';

import { ApiUtilsConfig } from '../config/api.config';
import { ApiChecker } from '../api';

export enum ServiceKey {
  Auth = 'auth',
  Subscriptions = 'subscriptions',
}

type ServicePort = number;

const servicePorts: Record<ServiceKey, ServicePort> = {
  [ServiceKey.Auth]: 3000,
  [ServiceKey.Subscriptions]: 3001,
};

export class ServiceChecker extends ApiChecker {
  private port: number;

  constructor(private service: ServiceKey) {
    super();
    this.port = servicePorts[service];
    this.checkerType = 'SERVICE';
  }

  async setup(): Promise<void> {
    const uri = await this.getInternalUri();
    this.setConfig(new ApiUtilsConfig(uri));
  }

  private async getInternalUri(): Promise<string> {
    const ip = await this.getIp();
    return `http://${ip}:${this.port}/api/${this.service}`;
  }

  private async getIp(): Promise<string> {
    const domain = await this.getDomain();
    try {
      return await this.lookup(domain);
    } catch (error) {
      console.log('Could not lookup domain');
      this.returnFalse();
    }
  }

  private async getDomain(): Promise<string> {
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

  private async lookup(name): Promise<string> {
    return new Promise((resolve, reject) => {
      lookup(name, { family: 4 }, (err, ips) => {
        if (err) {
          reject(err);
        } else {
          resolve(ips);
        }
      });
    });
  }
}
