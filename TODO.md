# TODO

A quick collection of things that need to be done at the highest level.

## Next up

List currently working through:

- [ ] Finish Kafka abstraction

## Important admin stuff

- [ ] Spin up a pod running [mongo-express](https://hub.docker.com/_/mongo-express)

## Nice to have

- [ ] Use @/tsconfig.json as source of truth for microservice tsconfig.json
  - [ ] Work out how to create tsconfig.json file on the fly within container using Docker
- [ ] Similar shared eslint and prettier config

---

## Kafka abstraction

- [ ] Create extends of KafkaConsumerConfig and use for KafkaProducer
  - [ ] Also change the name of the subscriptions-consumer etc to subscriptions-service
