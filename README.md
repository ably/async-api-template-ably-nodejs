# Node.js Ably template for the AsyncAPI Generator

## Usage

```
ag asyncapi.yaml @asyncapi/nodejs-ably-template -o output -p server=production
```

If you don't have the AsyncAPI Generator installed, you can install it like this:

```
npm install -g @asyncapi/generator
```

## Supported parameters

|Name|Description|Required|Example|
|---|---|---|---|
|server|The server you want to use in the code.|Yes|`production`|

## Supported protocols

* [Ably Realtime](https://github.com/ably/ably-js/)

## Running the produced code

Navigate to the output directory, and install the required npm modules with `npm install`. You can then run the code with `node src/api/index.js`.
