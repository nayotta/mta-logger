# @nayotta/mta-logger

[![Build and Lint](https://github.com/nayotta/mta-logger/actions/workflows/build-and-lint.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-logger/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-logger/actions/workflows/release.yml)

> A simple typescript/javascript logger module.

## install

```sh
$ npm install @nayotta/mta-logger --save
```

## use

log levels: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `panic`, `off`.

### inside formats

```ts
import { Logger, formats } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'debug',
	format: formats.default, // default
	// format: formats.json,
	// format: formats.text,
}).withFields({
	'#instance': 'app',
	'#method': 'init'
})

logger.info('app start on port', 8080)

// default print
// INFO[2021-10-13T15:20:19:042] app start on port 8080 #instance=app #method=init

// json print
// {"level":"info","time":"2023-07-10 15:18:38.7","#instance":"app","#method":"init","msg":"app start on port 8080"}

// text print
// level=info time="2023-07-10 15:22:44.513" msg="app start on port 8080" #instance=app #method=init

logger.infof('app start on port %s', 8080)

// default print
// INFO[2021-10-13T15:20:19:042] app start on port 8080           #instance=app #method=init

// json print
// {"level":"info","time":"2023-07-10 15:18:38.7","#instance":"app","#method":"init","msg":"app start on port 8080"}

// text print
// level=info time="2023-07-10 15:22:44.513" msg="app start on port 8080" #instance=app #method=init

```

### custom format

Also, you can make a custom format function to build your own log format.

```ts
import { Logger, TLogItem formats } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'debug',
	format: function (logItem: TLogItem) {
		const out: any[] = []
		const { level, time, error, logs, fields, colorful } = logItem
		// TODO: build your own custom log format
		// like:
		out.push(`${level.toUpperCase()}`)
		out.push(`t="${time.toLocaleString()}"`)
		for (const log of logs) {
			out.push(log)
		}
		if (error) {
			out.push(`err=${error.message}`)
		}
		for (const key in fields) {
			out.push(`${key}=${fields[key]}`)
		}
		// console.log(...out)
		return out
	}
}).withFields({
	'#instance': 'app',
	'#method': 'init'
})

logger.info('app start on port', 8080)

// print
// INFO t="7/10/2023, 3:31:01 PM" app start on port 8080 #instance=app #method=init

logger.infof('app start on port %s', 8080)

// print
// INFO t="7/10/2023, 3:31:01 PM" app start on port 8080           #instance=app #method=init
```

### log hooks

With log hooks, you can catch log action happened.

```ts
import { Logger, TLogItem formats } from '@nayotta/mta-logger'

const logger = new Logger({
	level: 'debug'
}).addLogHooks([{
	levels: ['error', 'fatal', 'panic'],
	callback: async function (logItem: TLogItem) {
		// TODO: do something
		console.log('send error message with log item:', logItem)
	}
}])

logger.withError(new Error('test')).error('failed to do something')
```
