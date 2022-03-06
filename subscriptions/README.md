## Description

Subscription service for RbC

## Installation

```bash
$ npm install
```

## Running the app

Should be done as part of a cluster. See @/README.md

### Running the app (on it's own) via Docker

```bash
# development, listening on http://localhost:3001/
$ docker run -p 3001:3001 curioushuman/rbc-subscriptions
```

## Test

### Quick and dirty

**NOTE**: this won't work if your tests actually use the MongoDB service, please mock it.

```bash
# rebuild development image
$ docker build --target development -t curioushuman/rbc-subscriptions:development .

# run tests
$ docker run curioushuman/rbc-subscriptions:development npm run test

# e2e tests
$ docker run curioushuman/rbc-subscriptions:development npm run test:e2e

# test coverage
$ docker run curioushuman/rbc-subscriptions:development npm run test:cov
```
