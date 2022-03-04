# RbC Ecosystem
## Description

Monorepo that gathers all the code for the RbC-Microservices + Apps Kubernetes cluster.

## Installation

### 1. Required software/packages

#### Docker for your OS

Head to the [Docker website](https://www.docker.com/products/docker-desktop) for more info. You also need to [turn on Kubernetes](https://docs.docker.com/desktop/kubernetes/) in Docker for Desktop settings.

**Note:** if you're using minikube or something else... You'll need to find other instructions.

#### Skaffold

Head to the [Skaffold website](https://skaffold.dev/docs/install/) for instructions.

#### Ingress Nginx for Kubernetes

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

### 2. Install Nodes.js dependencies for all the microservices

```bash
# development
$ npm run install:all
```

### 3. Other tidying

Make sure nothing is running on port 80. Run the following command, and shut anything you find to be using port 80:

```bash
$ sudo lsof -i tcp:80
```

If Chrome has a hissy fit RE security when you attempt to access elements from inside the cluster, simply click anywhere in the background and (literally) type:

```
thisisunsafe
```

## Running the cluster

```bash
# development
$ skaffold dev
```

## Debugging

### Quick and dirty

```bash
# Copy the pod name from the pod list
$ kubectl get pods

# Then output the logs from the pod
$ kubectl logs my-pod-name
```

## Test

TBC

## Keeping things consistent

* Eslint
* Prettier
* [Better comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
* [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

# Creating a new service

Use the Nest CLI, it's pretty awesome. You might need to change a few little bits here and there.

- [ ] List the changes that need to be made.

## Docker-ise

### 1. Get your files in place

Use the files from existing Microservices (e.g. *@/auth*) as a base:

- Dockerfile
- .dockerignore

**Important notes**

- There are 2 references to CMD in the *Dockerfile*
  - This is on purpose
  - When target is *development* the watch CMD runs, otherwise the *production* one does
  - So long as *target: development* is present in your skaffold.yaml

### 2. Create a base image to work from in development

**Important notes**

- Replace *service* in *rbc-service* with the name of your microservice.
- Use the *--target* parameter so Docker uses the *development* section of the Dockerfile, rather than the whole thing, when creating this initial image

```bash
$ docker build --target development -t curioushuman/rbc-service .
```

### 3. Push the image to Docker hub

```bash
$ docker push curioushuman/rbc-service
```

# Deployment

TBC

# Decisions (made along the way)

## Mongoose over TypeORM for MongoDB

TypeORM looks veeeeery nice, and it would be my preference but... [Support for MongoDB](https://github.com/typeorm/typeorm/issues/7907) version 4 is still in train, even though version 5 is out and version 3 is soon to be retired. I don't (currently) have time to contribute to the repo :(

Mongoose is the generally preferred option, but it's Typescript support pales in comparison to TypeORM (obviously). My option will be to persevere with Mongoose for now and adhere to any Typescript advice/support that I can find.

* https://mongoosejs.com/docs/typescript.html
* [Best... Article... Ever...](https://javascript.plainenglish.io/leverage-polymorphic-data-validation-with-nest-js-and-mongoose-10ae1dcbcf6d)
