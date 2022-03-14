import { ServiceKey, ServiceChecker } from '../';

describe(ServiceChecker.name, () => {
  let stub: Record<string, string>;
  let checker: ServiceChecker;
  let serviceKey: ServiceKey;
  let lookupSpy: jest.SpyInstance;
  let returnFalseSpy: jest.SpyInstance;

  beforeAll(() => {
    serviceKey = ServiceKey.Auth;
    stub = {
      ip: '10.0.0.1',
      namespace: 'fakenamespace',
      domain: `${serviceKey}-srv.fakenamespace.svc.cluster.local`,
      uri: 'http://10.0.0.1:3000/api/auth',
      readyUri: 'http://10.0.0.1:3000/api/auth/hello',
    };
  });

  describe('Setup', () => {
    beforeAll(() => {
      checker = new ServiceChecker(serviceKey);
      returnFalseSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'returnFalse')
        .mockImplementation(() => {
          console.log('mocked returnFalse');
        });
      lookupSpy = jest.spyOn(ServiceChecker.prototype as any, 'lookup');
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call the returnFalse function and exit if namespace file cannot be found', async () => {
      lookupSpy.mockResolvedValue(stub.ip);
      await checker.setup();
      expect(returnFalseSpy).toHaveBeenCalled();
    });

    it('should convert the namespace into an internal domain name', async () => {
      const namespaceSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'getNamespace')
        .mockResolvedValue(stub.namespace);
      lookupSpy.mockResolvedValue(stub.ip);
      await checker.setup();
      expect(namespaceSpy).toHaveBeenCalled();
      expect(checker.getConfigValue('uri')).toEqual(stub.readyUri);
    });

    it('should call the returnFalse function and exit if domain cannot be found in DNS', async () => {
      const domainSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'getDomain')
        .mockResolvedValue(stub.domain);
      lookupSpy.mockImplementation(() => {
        throw new Error('Could not lookup domain');
      });
      await checker.setup();
      expect(domainSpy).toHaveBeenCalled();
      expect(lookupSpy).toHaveBeenCalled();
      expect(returnFalseSpy).toHaveBeenCalled();
    });

    it.todo(
      'should get the IP of a domain passed to it using the DNS.lookup function',
    );

    it('should lookup the IP of the internal domain', async () => {
      const domainSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'getDomain')
        .mockResolvedValue(stub.domain);
      lookupSpy.mockResolvedValue(stub.ip);
      await checker.setup();
      expect(domainSpy).toHaveBeenCalled();
      expect(lookupSpy).toHaveBeenCalled();
      expect(checker.getConfigValue('uri')).toEqual(stub.readyUri);
    });

    it('should create an internal URI based on IP, port and service', async () => {
      const ipSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'getIp')
        .mockResolvedValue(stub.ip);
      await checker.setup();
      expect(ipSpy).toHaveBeenCalled();
      expect(checker.getConfigValue('uri')).toEqual(stub.readyUri);
    });

    it('should set the internal URI for the service to this.config.uri', async () => {
      const internalUriSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'getInternalUri')
        .mockResolvedValue(stub.uri);
      await checker.setup();
      expect(internalUriSpy).toHaveBeenCalled();
      expect(checker.getConfigValue('uri')).toEqual(stub.readyUri);
    });
  });
  describe('CheckConnect', () => {
    let returnTrueSpy: jest.SpyInstance;
    let checkErrorSpy: jest.SpyInstance;
    let checkConnectSpy: jest.SpyInstance;

    beforeAll(() => {
      returnTrueSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'returnTrue')
        .mockImplementation(() => {
          console.log('mocked returnTrue');
        });
      checkErrorSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'checkError')
        .mockImplementation(() => {
          console.log('mocked checkError');
        });
      checkConnectSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'checkConnect')
        .mockImplementation(() => {
          console.log('mocked checkConnect');
        });
    });

    it('should call setup from service checker prior to checkConnect', async () => {
      const internalUriSpy = jest
        .spyOn(ServiceChecker.prototype as any, 'getInternalUri')
        .mockResolvedValue(stub.uri);
      await checker.check();
      expect(internalUriSpy).toHaveBeenCalled();
      expect(checker.getConfigValue('uri')).toEqual(stub.readyUri);
    });

    // it('should call the setup function prior to checking the connection', async () => {
    //   const setupSpy = jest.spyOn(ServiceChecker.prototype as any, 'setup');
    //   checker.check();
    //   expect(setupSpy).toHaveBeenCalled();
    // });
  });
});
