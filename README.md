# @nayotta/mta-logger

[![Build and Lint](https://github.com/nayotta/mta-logger/actions/workflows/build-and-lint.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-logger/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/release.yml)

> A simple typescript/javascript logger module.

## install

```sh
$ npm install @nayotta/mta-logger --save
```

## example

```ts
import { Logger } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'debug'
}).withFields({
	'#instance': 'app',
	'#method': 'init'
})

logger.info('app start on port', 8080)

// print
// INFO[2021-10-13T15:20:19:042] app start on port 8080 #instance=app #method=init

logger.infof('app start on port %s', 8080)

// print
// INFO[2021-10-13T15:20:19:042] app start on port 8080 #instance=app #method=init
```
