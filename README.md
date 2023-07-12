# Bank Microservices

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/albertobas/bank-microservices/blob/main/LICENSE)

## About

Bank microservices is my own approach to a bank application with a microservices-based architecture, which can manage accounts, customers, and loans, but also make predictions of potential loan defaults and store data on-chain.

The idea behind this dummy bank application is to develop a user interface for employees that can handle creating, updating, and deleting accounts, customers and loans, store loans on-chain and make predictions about potential loan defaults.

## Technical details

The contracts are written in Solidity using Hardhat, and tested using Foundry.

The back-end code is written in Typescript using Express.js and Python using Flask.

The front-end code is mostly written in TypeScript using Next.js, a React.js framework.

Both, back-end (all the APIs but that of the Flask web service) and frontend, are implemented based on an hexagonal architecture .

Also, a scikit-learn pipeline has been developed that includes a Skorch neural net binary classifier that wraps a Pytorch neural net.

A hyperparameter optimization of both, model and training, evaluated by cross-validation is performed in a Jupyter notebook.

Finally, data can be queried from a local TheGraph node using GraphQL. The subgraph that is used is set to support multiple networks, relevant deployment data will be shared accordingly.

All of the microservices have their own Docker images.

- **Contracts Frameworks**: [Hardhat](https://hardhat.org/) and [Foundry](https://getfoundry.sh/)
- **Front-end Framework**: [Next.js](https://nextjs.org/)
- **Back-end Framework**: [Express.js](https://expressjs.com/) y [Flask](https://flask.palletsprojects.com/)
- **Query Language**: [GraphQL](https://graphql.org/)
- **Data Resource**: [TheGraph](https://thegraph.com/)
- **Styling**: [PostCSS](https://postcss.org)
- **Python dependency manager**: [Poetry](https://python-poetry.org/)
- **Neural net modelling**: [Pytorch](https://pytorch.org/)

## Overview

- `packages/*`: npm packages that contain code and configuration files that are used by other packages or services.
- `services/*`: microservices that make up the bulk of the application.
- `services/**/contracts/*`: smart contracts written in Solidity language.
- `services/**/scripts/*`: TypeScript scripts to deploy contracts and to write relevant information about them in both front-end and subgraph workspaces.
- `services/**/tasks/setState`: Hardhat task to set a state to the local node.
- `services/**/contracts/test/foundry/*`: test contracts to run with Foundry.
- `services/client/src/app/*`: app React.js functional components, CSSModules files, PostCSS mixins and a global css file.
- `services/client/src/features/*`: services code with its core and data sources.
- `services/client/src/**/shared/*`: user interface code shared across files at the same folder level.
- `services/**/subgraph/scripts/*`: script to generate a subgraph manifest from a template, replacing keys for values from a JSON file.
- `services/**/subgraph/src/*`: mappings, written in AssemblyScript, constants and entities used to extract data from the local Hardhat chain, process them and store them.
- `services/**/subgraph/templates/*`: a subgraph manifest template.
- `services/**/api/**/core/*`: this folder collects the business logic of each service.
- `services/**/api/**/controllers/*`: functions that define the operations desired by the API of the application..
- `services/**/api/**/data-sources/*`: class that implements methods described in the repositories.

## Running locally

This application uses pnpm and is configured to run with Docker Compose, although you can also run locally without having Docker installed.

```bash
$ git clone https://github.com/albertobas/bank-microservices.git
$ cd bank-microservices
$ git submodule update --init --recursive
```

### Running w/ Docker

```bash
$ pnpm install
$ pnpm start:chain --filter=customers # only run one node, for instance executing the hardhat node from the customers workspace
```

Open another tab in terminal and:

```bash
$ pnpm deploy:contracts && pnpm populate & pnpm share
$ COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose -f docker-compose.yaml build
$ docker compose -f docker-compose.yaml up
```

### Running w/o Docker

```bash
$ cd services/loans-model
$ poetry install --no-root
```

rerplace 'host.docker.internal' for 127.0.0.1 for all the corresponding npm scripts in services/loans/package.json and services/customers/package.json

then:

```bash
& pnpm install
$ pnpm run start:chain
```

Open another tab in terminal and:

```bash
$ pnpm compile && pnpm deploy:contracts
$ pnpm populate & pnpm share
$ pnpm build
$ pnpm start
```

## Testing the contracts

```bash
$ pnpm test
```