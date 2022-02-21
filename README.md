# @nayotta/mta-logger

[![Build and Lint](https://github.com/nayotta/mta-logger/actions/workflows/build-and-lint.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-logger/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/release.yml)

> A javascript logger module.

## example

### common logger

```ts
import { Logger } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'all'
})

logger.info('init app', 'app start on port', 8080)

// print
// [info] 2021-10-13T15:20:19:042 [init app] app start on port 8080
```

### position logger

```ts
import { Logger } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'all',
	position: 'func_name'
})

logger.info('running by port', 8080)

// print
// [info] 2021-10-13T15:20:19:042 [func_name] running by port 8080
```
