# SROC Charging Module API Acceptance tests

![Build Status](https://github.com/DEFRA/sroc-cha-acceptance-tests/workflows/CI/badge.svg?branch=main)
[![Licence](https://img.shields.io/badge/Licence-OGLv3-blue.svg)](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The [Charging Module API](https://github.com/defra/charging-module-api) provides an interface for calculating charges, creating and queuing transactions, and generating transaction and customer files used to produce Environment Agency invoices.

This project contains acceptance tests for the service. It is built using [Newman](https://github.com/postmanlabs/newman) and the [Postman App](https://www.postman.com/downloads/).

## Pre-requisites

You just need [Node.js](https://nodejs.org/en/) installed, ideally an LTS version.

You'll also need the [Postman App](https://www.postman.com/downloads/) installed. It's used to create maintain the [collection](https://learning.postman.com/docs/sending-requests/intro-to-collections/) of requests and associated tests we use. See [cha.postman_collection.json](cha.postman_collection.json).

## Installation

First clone the repository and then drop into your new local repo

```bash
git clone https://github.com/DEFRA/sroc-cha-acceptance-tests.git && cd sroc-cha-acceptance-tests
```

Next download and install the dependencies

```bash
npm install
```

## Configuration

> Important! Do not add environment files to source control

We have 6 environments where the CHA could be running; local, development, test, integration, pre-production, and production.

For each environment you wish to test you'll need to create an [environment file](https://learning.postman.com/docs/sending-requests/managing-environments/) in  `environments/`. An [example](/environments/example.postman_environment.json) with dummy data is provided as a reference.

For example, if you wanted to start testing the **development** environment the steps would be

- duplicate [example.postman_environment.json](/environments/example.postman_environment.json)
- rename to something meaningful; `dev.postman_environment.json`
- update the `name` attribute to something meaningful: `"name": "CHA DEV acceptance tests",`
- update the `value` attribute for each of the properties (`baseUrl`, `tokenUrl`, `adminUser` etc) to match the environment

You'll need to contact an existing [team member](https://github.com/DEFRA/sroc-service-team) to obtain the proper credentials.

Git is setup to ignore everything bar the example environment file. Even so, double check your environment file has not been comitted before pushing it to GitHub.

## Execution

Running the tests involves firing all the requests in the [cha.postman_collection.json](cha.postman_collection.json) combined with the values taken from the selected environment file. For example, if you wanted to test the **development** environment and had created the environment file `dev.postman_environment.json` you would call

```bash
npm start -- -e dev
```

The app will automatically look for a `*.postman_environment.json` with the matching prefix.

### Reporters

**Newman** comes with some [built-in reporters](https://github.com/postmanlabs/newman#reporters) the default being the [CLI reporter](https://github.com/postmanlabs/newman#cli-reporter).

When you run the tests you can specify which of these reporters to use

```bash
npm start -- -e dev -r json
```

You can even specify multiple reporters

```bash
npm start -- -e dev -r cli json
```

If you don't set a reporter the tests will use `cli` as the default.

### CI

To check we haven't broken anything we have a [separate Postman collection](/ci.postman_collection.json) we use just when running our CI checks. If you call `npm start example` it will run the CI request and test rather than the main charging module ones.

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
