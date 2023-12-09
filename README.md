# Bank Microservices

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/albertobas/bank-microservices/blob/main/LICENSE)

## About

Bank Microservices is my own approach to a bank application, with a microservices-based architecture and using the [MERN stack](https://www.mongodb.com/mern-stack 'What Is The MERN Stack? Introduction & Examples | MongoDB'), which can handle creating, updating, and deleting accounts, customers and loans, store data on-chain and make predictions about potential loan defaults.

## Technical details

The contracts are written in Solidity using Hardhat, and tested using Foundry.

The back-end code is written in Typescript using Express.js and Python using Flask.

The front-end code is mostly written in TypeScript using Next.js, a React.js framework.

Both, back end (all the APIs but that of the Flask web service) and front end, are implemented based on an hexagonal architecture .

Also, a scikit-learn pipeline has been developed that includes a Skorch neural net binary classifier that wraps a Pytorch neural net.

A hyperparameter optimization of both, model and training, evaluated by cross-validation is performed in a Jupyter notebook.

Finally, data can be queried from a local TheGraph node using GraphQL. The subgraph that is used is set to support multiple networks, relevant deployment data will be shared accordingly.

All of the microservices have their own Docker images.

- **Contracts frameworks**: [Hardhat](https://hardhat.org) and [Foundry](https://getfoundry.sh)
- **Front-end framework**: [Next.js](https://nextjs.org)
- **Back-end frameworks**: [Express.js](https://expressjs.com) and [Flask](https://flask.palletsprojects.com)
- **Query language**: [GraphQL](https://graphql.org)
- **Data resources**: [MongoDB](https://www.mongodb.com) and [TheGraph](https://thegraph.com)
- **Styling**: [PostCSS](https://postcss.org)
- **Python dependency manager**: [Poetry](https://python-poetry.org)
- **Machine learning framework**: [Pytorch](https://pytorch.org)

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

This application uses pnpm and is configured to run with Docker Compose.

```bash
$ git clone https://github.com/albertobas/bank-microservices.git
$ cd bank-microservices
$ git submodule update --init --recursive
$ cp .env.example .env # fill in tha values for each variable in .env
$ pnpm install
$ pnpm start:chain --filter=customers # only run one node, for instance executing the hardhat node in the customers workspace
```

Open another tab in terminal and:

```bash
$ pnpm deploy:contracts && pnpm populate & pnpm share
$ COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose -f docker-compose.yaml build
$ docker compose -f docker-compose.yaml up
```

## Testing the contracts

```bash
$ pnpm test
```
