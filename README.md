# A Mini Crypto Wallet Service.

* This project is built using [Express.js](https://expressjs.com/) web framework, and is using [Typescript Lang](https://www.typescriptlang.org/) for writing the app's logic. 
* For Database - Repo contains the use of [Mongoose](https://mongoosejs.com/) (ie. [MongoDB](https://www.mongodb.com/) object modeling for [Node.js](https://nodejs.org/en/)).
* For Routing - Repo contains the use of [express-router](https://expressjs.com/en/guide/routing.html) & have distributed Routes into two files ie. Web Routes & API Routes. 
* For Logging - Repo uses custom Log class built in middlewares folder, and it creates logs file by date & removes the log files after 'X' days (You can define that 'X' in the `.env` file). And config log to this App can run on App Engine of Google Cloud

## Contents

* [Global Requisites](#global-requisites)
* [App Structure](#app-structure)
* [Install, Configure & Run](#install-configure--run)
* [List of Routes](#list-of-routes)

## Global Requisites

* node (>= v12.21.0)
* tsc (>= 4.4.3)
* typescript (>= 4.3.5)
* mongoose (>= 5.10.1)
* jest

## App Structure

> _Note: these files in configs is map with process.env.NODE_ENV. You need to change configs/*.example files to configs/*.json files and update corresponding values. If you use mongo database from https://cloud.mongodb.com/ you just need fill uri connection string into dbConfig.uri otherwise you can fill value to dbConfig.host, dbConfig.port, dbConfig.database in case you use docker to run mongo server for testing purpose.

```bash
├── README.md
├── app.yaml
├── jest.config.js
├── logs
├── nodemon.json
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── configs
│   │   ├── development.json
│   │   ├── production.json
│   │   └── test.json
│   ├── controllers
│   │   └── wallet.controller.ts
│   ├── databases
│   │   └── index.ts
│   ├── dtos
│   │   └── wallets.dto.ts
│   ├── exceptions
│   │   └── HttpException.ts
│   ├── interfaces
│   │   ├── db.interface.ts
│   │   ├── models
│   │   │   └── wallets.interface.ts
│   │   └── routes.interface.ts
│   ├── logs
│   ├── middlewares
│   │   └── error.middleware.ts
│   ├── models
│   │   └── wallets.model.ts
│   ├── response_schema
│   │   └── wallet.response-schema.ts
│   ├── routes
│   │   ├── validator.ts
│   │   └── wallet.route.ts
│   ├── server.ts
│   ├── services
│   │   └── wallets.service.ts
│   ├── tests
│   │   └── wallets.test.ts
│   └── utils
│       ├── logger.ts
│       └── util.ts
├── swagger.yaml
├── .env.example
└── tsconfig.json
```

## Install, Configure & Run

Below mentioned are the steps to install, configure & run.

```bash
# Clone the repo.
git clone https://github.com/
Go to main project directory
Rename .env.example to .env file and config server POST and NODE_ENV with values you want. 
```

```bash

# Note: It is preassumed here that you have mongoose running in background & you have created the database.

# Install NPM dependencies.
# Note: You can review the list of dependencies from the below link.
npm install;

# Run unit test
npm run test

# Run the app
npm run dev;
```


## List of Routes

```sh
# API Routes:

+--------+-------------------------+
  Method   | URI
+--------+-------------------------+
  POST     | /wallets
  GET      | /wallets/address
  PUT      | /wallets/address
  DELETE   | /wallets/address
+--------+-------------------------+
```
