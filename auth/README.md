## Description

Members service for RbC.

## For more information

See @/README.md.

## Installation

### Node modules

```bash
$ npm install
```

### Required software

See @/README.md for more info.

- kubectl
- helm
- The ability to run a local cluster
  - Docker, running kubernetes
  - Minikube
- Skaffold

### Kubernetes dependencies

```bash
# Add helm repos
$ helm repo add bitnami https://charts.bitnami.com/bitnami
```

## Running the app

Can be run as part of overall cluster; see @/README.md.

OR you can run/test just this app using:

```bash
$ skaffold dev
```

### TODO

- [ ] Get it to not look for microservices, or not fail if they don't exist
