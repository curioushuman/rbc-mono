## Description

Members service for RbC

## Goals for this app

* Documented in Swagger
* Solid test coverage

## Installation

```bash
$ npm install
```

## Running the app via Docker

```bash
# development, listening on http://localhost:3000/
$ docker run -p 3000:3000 curioushuman/rbc-auth
```

## Kubernetes

Need to push the docker image up to docker hub:

```bash
$ docker push curioushuman/rbc-auth
```

Need to install Ingress Nginx

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

## Running the app

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
