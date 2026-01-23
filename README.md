# jest-bdd-generator

Bridgeing Jest tests to Gherkin feature files

## Monorepo layout
- [`packages/sdk`](packages/sdk/README.md) - the [`jest-bdd-generator`](https://www.npmjs.com/package/jest-bdd-generator) library on NPM.
- [`packages/demo](packages/demo/README.md) - runnable examples that exercise the CLI commands, HTML report generationm and UI widgets against real test suits.
- [`packages/website](packages/website/README.md) - Docusaurus documetation site.

Additional build and tooling configuration lives under `common/`, managed by Rush.

## Prerequisites
- Node.js ">=18.20.3 <19.0.0 || >=20.14.0 <21.0.0",
- Install `Rush` globally if you have not already:
    ```bash
    npm install -g @microsoft/rush
    ```

## Install and build
```bash
rush update # install dependencies via pnpm.
rush build # compile packages respecting the dependency graph
```

## Run demo, docs, and debugging
- SDK: `cd packages/sdk && rushx build:watch` to start debugging. Other packages refer to its live build.
- demo app: `cd pakcages/demo && rushx start` to launch the example UI. For other CLI demos, refer to package-level README.md.
- Documentation site: `cd packages/website && rushx start` to spin up the Docusaurus dev server. (Dev build without live lunr search)