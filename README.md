# RbC Ecosystem
## Description

Monorepo that gathers all the code for the RbC-Microservices + Apps Kubernetes cluster.

## Installation

### 1. Required software/packages

#### 1.1 Docker for your OS

Head to the [Docker website](https://www.docker.com/products/docker-desktop) for more info. You also need to [turn on Kubernetes](https://docs.docker.com/desktop/kubernetes/) in Docker for Desktop settings.

**Note:** if you're using minikube or something else... You'll need to find other instructions.

#### 1.2 Skaffold

Head to the [Skaffold website](https://skaffold.dev/docs/install/) for instructions.

#### 1.3 Ingress Nginx for Kubernetes

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

#### 1.4 Helm

TBC

```bash
# Add helm repos
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm repo add nats https://nats-io.github.io/k8s/helm/charts/
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

**TODO**

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

## Environment management

TBC - for now, you don't need to do anything special just yet

We'll be keeping things simple to begin with. Environment information & configuration will be stored in:

* For development
  * Different Skaffold profiles OR KUBECONTEXT
* For non-local
  * Different [Helm files for Argo](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/)

*

# Decisions (made along the way)

## Mongoose over TypeORM for MongoDB

TypeORM looks veeeeery nice, and it would be my preference but... [Support for MongoDB](https://github.com/typeorm/typeorm/issues/7907) version 4 is still in train, even though version 5 is out and version 3 is soon to be retired. I don't (currently) have time to contribute to the repo :(

Mongoose is the generally preferred option, but it's Typescript support pales in comparison to TypeORM (obviously). My option will be to persevere with Mongoose for now and adhere to any Typescript advice/support that I can find.

* https://mongoosejs.com/docs/typescript.html
* [Another helpful article](https://javascript.plainenglish.io/leverage-polymorphic-data-validation-with-nest-js-and-mongoose-10ae1dcbcf6d)
* Use [Document.save() over other update methods](https://masteringjs.io/tutorials/mongoose/update)

## Exception handling

- HTTP exceptions from controller ONLY
- Exceptions caught in the service and below should be caught, logged, and passed up to be converted to HTTP format by the controller

This allows us flexibility in the future in case our services etc are serving non HTTP channels.

## OpenAPI / Swagger

- We'll use the [CLI plugin](https://docs.nestjs.com/openapi/cli-plugin) to keep additional decorators at a minimum
- **MOST IMPORTANT** to remember are to use comments above
  - DTO props
  - Controller routes

## Automapper for data mapping between DTO and Schema

We don't want the data structure to be directly exposed as the API. Therefore there was always going to need to be some kind of mapping between (incoming) DTO objects/classes and Schema/Entity classes.

The idea comes from the 'data mapper' pattern outlined in the following articles:

* [Use DTOs to Enforce a Layer of Indirection](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/use-dtos-to-enforce-a-layer-of-indirection/#Using-Data-Transfer-Objects)
* [Implementing DTOs, Mappers & the Repository Pattern](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/#Data-Mappers)

### Options considered

#### Interceptors or pipes

Interceptors and pipes happen [too early](https://docs.nestjs.com/faq/request-lifecycle) i.e. before the controller. Nothing in fact exists between the controller and the service, or the service and the entity/repository/schema/document.

#### Decorators

Param decorators (again) seem to be targeted towards the pre-controller / route handling period of the lifecycle. At least the documentation heavily implies this as it's core use case, even though decorators outside of this context obviously exist.

**REQUEST:** if anyone knows a better way using decorators please let me know.

#### Different routes, more DTOs

This would still require that each DTO at least partially maps to the data structure.

#### A Service

Entirely possible, but doesn't quite feel right.

#### Mapping functions in DTO classes

Again not a bad option, but creates a bunch of cruft and tightly couples the DTO and the Entity/Model.

### Use a mapper (@Automapper)

There were a few different options in the mapper space:

* [Morphism](https://github.com/nobrainr/morphism)
* [Class transformer](https://github.com/typestack/class-transformer)
  * Which we use elsewhere in the Nest stack
  * But it doesn't include an object to object mapping
  * classToClass is an object clone
* [Automapper](https://automapperts.netlify.app/docs/introduction/what-why)
  * Heavily based on the package by the same name in the .NET ecosystem
* Some others that weren't well supported

Automapper is Typescript first with Nest integration being a core part of it's selling point. It allows us to use decorators where possible, and separate out remaining mapping logic into *mappers* where I feel it belongs.

The basics:

* Props marked with @AutoMap() map directly from DTO to Model
* Otherwise look in the relevant mapper and you'll see the logic for mapping

Some useful links:

- [Docs](https://automapperts.netlify.app/docs/introduction/what-why)
- [Example repo](https://github.com/Tevpro/nest-automapper-demo/tree/b04664999fd3517cbda3f7058580a15cd7a97f49)

## Map in the controller, not the service

If you **DO** use a mapper, use it at the controller level and **NOT** the service. This is to allow potentially different transport methods to use different DTOs.
