# Haaku-TS
`haaku-ts` is the official TypeScript client for interacting with the Haaku.tv API.

## Installation
To install `haaku-ts` you can run the following command based on your package manager:

**npm**:
```bash
npx jsr add @haaku/haaku-ts
```
**pnpm**:
```bash
pnpm i jsr:@haaku/haaku-ts
```
**deno**:
```bash
deno add jsr:@haaku/haaku-ts
```
**bun**:
```bash
bunx jsr add @haaku/haaku-ts
```

`haaku-ts` uses the JSR for its distribution, so its installation is slightly different.

## Usage
To begin usage, import the package and instantiate the class:

```ts
import { Haaku } from '@haaku/haaku-ts';

const haaku = new Haaku({
    apiKey: 'YOUR_API_KEY',
    baseUrl: 'https://haaku.tv',
    fetch: fetch // Optional, pass in your own fetch compatible function
})
```

Now with your `haaku` class, you can now interact with the API by simply running any of the functions offered by the `haaku` class.

Docs coming soon!