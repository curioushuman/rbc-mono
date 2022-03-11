import * as yargs from 'yargs';

import { Checker } from './types/checker';
import { KafkaChecker } from './kafka';
import { ApiChecker } from './api';

// TODO
// - change Checker interface to abstract class

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
