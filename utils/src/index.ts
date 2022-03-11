import { KafkaCheck } from './kafka';

async function check() {
  const kafkaCheck = new KafkaCheck();
  await kafkaCheck.check();
}
check();
