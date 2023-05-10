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

## Building

```shell
npm run build
```
