<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Compile and run the project

```bash
# development
$ docker-compose up -d

# watch mode
$ docker-compose up

```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

# Organize My Mind Backend API
#### Project Description

Organize My Mind is a backend API designed to power a personal knowledge management and organization application. This API provides the core functionality for managing and structuring your thoughts, notes, flashcards, annotations, and potentially other organizational tools.  Built with NestJS, this backend emphasizes a clean architecture, maintainability, and scalability.

#### Technologies Used
- Backend Framework: NestJS (Node.js framework for building efficient and scalable server-side applications)
- Database: MySQL (Relational database for persistent data storage)
- Containerization: Docker and Docker Compose (For easy setup, consistent development environment, and deployment)
- Package Manager: pnpm (Fast, disk space efficient package manager for Node.js)
- Linter & Formatter: Biome (For code linting, formatting, and ensuring code quality and consistency)
Prerequisites

##### Before you begin, ensure you have the following installed:

- Docker and Docker Compose
- Node.js v23.8.0+
- pnpm v10.4.1+
##### Recommended IDE Extension:

- Biome Extension: For optimal code linting and formatting, it is highly recommended to install the Biome extension for your code editor (e.g., VS Code). This extension will ensure your code adheres to the project's linting rules and formatting styles, contributing to a consistent and high-quality codebase.

##### Getting Started - Development Setup
- Clone the repository:

```Bash

$ git clone <repository_url>
$ cd <repository_directory>/api-organize-my-mind

```
- Start the development environment with Docker Compose:

From the root project directory (containing docker-compose.yml), run:

## Compile and run the project

```bash
# development
$ docker-compose up -d

# watch mode
$ docker-compose up

```
##### This command will:

Build the Docker image for the API service.
Start the MySQL database container (db) and the API container (api).
Link the containers so the API can connect to the database.
Start the API in development mode (pnpm start:dev) inside the container.
Access the API:

##### Once the containers are running, the API will be accessible at:

- http://localhost:3000

##### Development Notes
Database Configuration: Database connection details are configured through environment variables in the docker-compose.yml file and accessed by the NestJS application.

Hot Reloading: The API container is configured for hot reloading in development mode. Any changes you make to the API code in the ./api-organize-my-mind directory will automatically trigger a server restart within the container.

Linting and Formatting: Ensure you have the Biome extension installed in your code editor to benefit from automatic code linting and formatting as you develop. Run pnpm biome:check and pnpm biome:format to manually check and format your code.

Stopping the Environment: To stop the Docker Compose environment, in your terminal, press Ctrl+C and then run:

```Bash

$ docker-compose down
# add flag -v if you want delete data of database
$ docker-compose down -d
```
##### Further Steps
Explore the NestJS application code in the ./api-organize-my-mind directory.
Refer to the NestJS documentation for further information on framework features and development practices.
Start building amazing features to organize your mind!
