# AMPATH O3

This monorepo houses custom frontend modules used in the AMPATH O3 frontend. These include:

- [Pre-appointments](packages/esm-preappointment-app)

## Setup

Check out the developer documentation [here](http://o3.docs.openmrs.org).

Install dependencies by running:

```sh
yarn
```

## Development

To run a local dev server for a specific frontend module, run:

```sh
yarn start --sources 'packages/esm-<insert-package-name>-app'
```

Where the argument to `--sources` is the name of the frontend module you want to run. It will run a dev server proxied to a hosted instance of the AMPATH backend by default.

You could provide `yarn start` with as many `sources` arguments as you require. For example, to run the patient registration and patient search modules only, use:

```bash
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-registration-app'
```

## Troubleshooting

If you notice that your local version of the application is not working or that there's a mismatch between what you see locally versus what's in the reference application, you likely have outdated versions of core libraries. To update core libraries, run the following commands:

```bash
# Upgrade core libraries
yarn up openmrs @openmrs/esm-framework

# Reset version specifiers to `next`. Don't commit actual version numbers.
git checkout package.json

# Run `yarn` to recreate the lockfile
yarn
```

## Contributing

Please read our [contributing](http://o3-dev.docs.openmrs.org/#/getting_started/contributing) guide.

## Running tests

To run tests for all packages, run:

```bash
yarn turbo test
```

To run tests in `watch` mode, run:

```bash
yarn turbo test:watch
```

To run tests for a specific package, pass the package name to the `--filter` flag. For example, to run tests for `esm-patient-conditions-app`, run:

```bash
yarn turbo test --filter="esm-patient-conditions-app"
```

To run a specific test file, run:

```bash
yarn turbo test -- basic-search
```

The above command will only run tests in the file or files that match the provided string.

You can also run the matching tests from above in watch mode by running:

```bash
yarn turbo test:watch --basic-search
```

To generate a `coverage` report, run:

```bash
yarn turbo coverage
```

By default, `turbo` will cache test runs. This means that re-running tests wihout changing any of the related files will return the cached logs from the last run. To bypass the cache, run tests with the `force` flag, as follows:

```bash
yarn turbo test --force
```

### Unit tests

To run unit tests, use:

```sh
yarn test
```

### E2E tests

To run E2E tests, make sure the dev server is running by using:

```sh
yarn start --sources 'packages/esm-*-app/'
```

Then, in a separate terminal, run:

```sh
yarn test-e2e --headed
```

Please read [our e2e test guide](https://o3-docs.openmrs.org/docs/frontend-modules/testing#end-to-end-testing-with-playwright) for more information about E2E testing.

### Updating Playwright Version

To upgrade your Playwright version, ensure that you update both the package.json file and the [e2e/support/bamboo/playwright.Dockerfile](e2e/support/bamboo/playwright.Dockerfile).

## Design Patterns

For documentation about our design patterns, please visit our [design system](https://zeroheight.com/23a080e38/p/880723--introduction) documentation website.

## Deployment

The `main` branch of this repo is deployed in a [demo environment](https://openmrs-spa.org/openmrs/spa).

## Configuration

This module is designed to be driven by configuration files. Each module has a `config-schema.ts` file at its root. This file contains the schema for the configuration file that the module expects. The distro-level configuration file is located [here](https://github.com/AMPATH/openmrs-config-amrs/blob/main/configuration/config.json). To learn more about configuration, read the [Distro config](https://o3-docs.openmrs.org/docs/configure-o3/overview) and the [Configuration](https://o3-docs.openmrs.org/docs/configuration-system) guides in the official docs.
