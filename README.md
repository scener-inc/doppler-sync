# CLI and node tool for synchronously loading Doppler config secrets

## Set up Doppler Secret Manager

[Getting started with doppler](https://docs.doppler.com/docs/enclave-guide)

[Generate a service token](https://docs.doppler.com/docs/enclave-service-tokens)

## Getting started - Typescript / Javascript

Add doppler-sync to your project

```sh
$ npm install @webkoils/doppler-sync
#or
$ yarn add @webkoils/doppler-sync
```

<br/>

## Getting started

Globally install doppler-sync

```sh
$ npm install @webkoils/doppler-sync -g
#or
$ yarn global add @webkoils/doppler-sync
```

Load Doppler secret values using DOPPLER_TOKEN in environment variables

```sh
$ doppler-sync
```

Load Doppler config secret values using DOPPLER_TOKEN in javascript

```node.js
import { getConfig } from "@webkoils/doppler-sync";
let config = getConfig({
    token?: string,
    prefix?: string
})
```

<br/>

## CLI arguments

-   `npx doppler-sync --help` - Get possible arguments
-   `npx doppler-sync --token <DOPPLER_TOKEN> ` - get all parameters with specified access token
-   `npx doppler-sync --prefix <PREFIX>` - only return secrets that start with prefix
