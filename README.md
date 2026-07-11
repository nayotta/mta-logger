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
import { Logger, formats } from "@nayotta/mta-logger";

const logger = new Logger({
  level: "debug",
  format: formats.default, // default
  // format: formats.json,
  // format: formats.text,
}).withFields({
  "#instance": "app",
  "#method": "init",
});

logger.info("app start on port", 8080);

// default print
// INFO[2021-10-13T15:20:19:042] app start on port 8080 #instance=app #method=init

// json print
// {"level":"info","time":"2023-07-10 15:18:38.7","#instance":"app","#method":"init","msg":"app start on port 8080"}

// text print
// level=info time="2023-07-10 15:22:44.513" msg="app start on port 8080" #instance=app #method=init

logger.infof("app start on port %s", 8080);

// default print
// INFO[2021-10-13T15:20:19:042] app start on port 8080           #instance=app #method=init

// json print
// {"level":"info","time":"2023-07-10 15:18:38.7","#instance":"app","#method":"init","msg":"app start on port 8080"}

// text print
// level=info time="2023-07-10 15:22:44.513" msg="app start on port 8080" #instance=app #method=init

// rich format specifiers (powered by sprintf-js)
logger.infof("user %s has %d messages, %.1f%% done", "Alice", 5, 87.6);
// → user Alice has 5 messages, 87.6% done

logger.debugf("hex: 0x%04X, oct: %o, bin: %b", 255, 8, 5);
// → hex: 0x00FF, oct: 10, bin: 101

logger.errorf("[%10s] %-10s | count=%04d", "worker", "ok", 42);
// → [    worker] ok         | count=0042
```

### supported format specifiers

Powered by [sprintf-js](https://github.com/alexei/sprintf.js), the `*f` methods support full C/printf-style formatting:

| specifier   | description                 | example                  |
| ----------- | --------------------------- | ------------------------ |
| `%s`        | string (default)            | `%s` → `hello`           |
| `%d` / `%i` | signed decimal integer      | `%d` → `42`              |
| `%f`        | floating point              | `%f` → `3.14`            |
| `%.Nf`      | float with N decimal places | `%.2f` → `3.14`          |
| `%x` / `%X` | hex (lower/upper)           | `%x` → `ff`, `%X` → `FF` |
| `%o`        | octal                       | `%o` → `10`              |
| `%b`        | binary                      | `%b` → `101`             |
| `%e`        | scientific notation         | `%e` → `1.000000e+2`     |
| `%t`        | boolean                     | `%t` → `true`            |
| `%%`        | literal percent             | `%%` → `%`               |

Width, alignment and padding:

| flag   | description                  | example         | output       |
| ------ | ---------------------------- | --------------- | ------------ |
| `%Ns`  | right-align, width N         | `%10s`, `'hi'`  | `        hi` |
| `%-Ns` | left-align, width N          | `%-10s`, `'hi'` | `hi        ` |
| `%0Nd` | zero-padded integer, width N | `%04d`, `7`     | `0007`       |

### colorful option

The `colorful` option adds color to log level prefixes and field keys to improve readability. It works in both terminal and browser environments with different underlying mechanisms:

| environment        | mechanism         | example                                     |
| ------------------ | ----------------- | ------------------------------------------- |
| terminal (Node.js) | ANSI escape codes | `\x1b[36mDEBU\x1b[0m` → colored text        |
| browser (DevTools) | `%c` CSS styles   | `%cDEBU%c` + `color: #56b6c2` → styled text |

```ts
const logger = new Logger({
  level: "debug",
  colorful: true, // default: false
});

logger.info("server started");
// terminal: \x1b[36mINFO\x1b[0m[2026-...] server started
// browser: %cINFO%c[2026-...] server started

logger.debugf("request %s processed in %dms", "GET /api", 42);
```

When `colorful` is enabled, the output array includes CSS style parameters for browser `console.log`'s `%c` substitution — no extra configuration needed.

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
