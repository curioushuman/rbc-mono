## Description

Members service for RbC

## Installation

```bash
$ npm install
```

## Running the app

Should be done as part of a cluster. See @/README.md

### Running the app (on it's own) via Docker

```bash
# development, listening on http://localhost:3000/
$ docker run -p 3000:3000 curioushuman/rbc-auth
```

### Running the app (otherwise)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
