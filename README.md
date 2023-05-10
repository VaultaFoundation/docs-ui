# EOS Docs

## Installation

```shell
npm install
```

## Preparing the docs

Before you can build or run the docs you need to populate the content directories.

```shell
node scripts/prepare-docs [--docs-branch=<branch>] [--skip-docs] [--skip-apis] [--skip-manuals]
```

This will pull down all repositories and do some massaging to make them fit into docusaurus.

## Running

```shell
npm start
```

### Watch changes to local docs repository

You can watch your local `docs` repository to work directly against the docs UI when you write EOS documentation:

```shell
node scripts/pull-docs-locally.js <path-to-docs-repo>
```

## Building

```shell
npm run build
```

## Changing the content repo versions

- For APIs (leap) you need to change the version in `scripts/prepare-apis.js`.
- For software manuals, you need to change the version in `scripts/prepare-manuals.js`.
- For docs, you specify the version as an option to the `prepare-docs` script (see above).

Everything else is automated, so you don't need to worry about it.
