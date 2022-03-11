import * as yargs from 'yargs';

import { KafkaChecker } from './kafka';
import { ApiChecker } from './api';

// TODO
// - add checker for services, and then piggyback on the API checker

// grab args to determine what is being checked
const argvParser = yargs(process.argv.slice(2)).options({
  c: {
    alias: 'check',
    choices: ['kafka', 'api'] as const,
    demandOption: true,
    description: 'what is being checked',
  },
});

async function check() {
  const argv = await argvParser.argv;
  if (argv.c === 'kafka') {
    const checker = new KafkaChecker();
    await checker.check();
  } else {
    const checker = new ApiChecker();
    await checker.check();
  }
}

check();
