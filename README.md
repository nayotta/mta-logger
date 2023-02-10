# @nayotta/mta-logger

[![Build and Lint](https://github.com/nayotta/mta-logger/actions/workflows/build-and-lint.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-logger/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/release.yml)

> A javascript logger module.

## example

```ts
import { Logger } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'debug',
	colorful: true
}).withFields({
	'#instance': 'app',
	'#method': 'init'
})

logger.info('app start on port', 8080)

// print
// INFO[2021-10-13T15:20:19:042] app start on port 8080 #instance=app #method=init
```
