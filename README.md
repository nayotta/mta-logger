# @nayotta/mta-logger

[![Build and Lint](https://github.com/nayotta/mta-logger/actions/workflows/build.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/build.yml)

> A javascript logger module.

## example

```ts
import Logger from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'all'
})

logger.info('init app', 'app start on port', 8080)

// print
// [info] 2021-10-13T15:20:19:042 [init app] app start on port 8080
```
