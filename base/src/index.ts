import * as yargs from 'yargs';

import { KafkaChecker } from './kafka';
import { ApiChecker } from './api';
import { ServiceKey, ServiceChecker } from './service';

// grab args to determine what is being checked
const services = Object.values(ServiceKey);
const argvParser = yargs(process.argv.slice(2)).options({
  c: {
    alias: 'check',
    choices: ['kafka', 'api', 'service'] as const,
    demandOption: true,
    description: 'what is being checked',
  },
  s: {
    alias: 'service',
    choices: services,
    description: 'A specific service being checked',
  },
});

async function check() {
  const argv = await argvParser.argv;
  if (argv.c === 'kafka') {
    const checker = new KafkaChecker();
    await checker.check();
  } else if (argv.c === 'api') {
    const checker = new ApiChecker();
    await checker.check();
  } else {
    const checker = new ServiceChecker(argv.s);
    await checker.check();
  }
}

check();
