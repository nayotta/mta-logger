import { Logger, TLogFValue } from '../src'

class TestLogger extends Logger {
	public testBuildPrefix (level: string): string {
		return this.buildPrefix(level)
	}

	public testDoLevelCheck (level: string): boolean {
		return this.doLevelCheck(level)
	}

	public testBuildLogTmpl (tmpl: string, ...args: TLogFValue[]): string {
		return this._buildLogTmpl(tmpl, args)
	}
}

test('basic', () => {
	const logger = new TestLogger({
		level: 'info',
		colorful: false
	})
	expect(logger.level).toBe('info')

	// log prefix
	const logPrefix = logger.testBuildPrefix('warn')
	expect(/^WARN\[\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{1,}\]$/.test(logPrefix)).toBe(true)
})

test('without position', () => {
	const logger = new TestLogger({
		level: 'trace'
	})

	const logPrefix = logger.testBuildPrefix('warn') as string
	expect(/^\[warn\].+\[.+\]$/.test(logPrefix)).toBe(false)
})

test('level [trace]', () => {
	const logger = new TestLogger({
		level: 'trace'
	})
	expect(logger.level).toBe('trace')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 0
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [debug]', () => {
	const logger = new TestLogger({
		level: 'debug'
	})
	expect(logger.level).toBe('debug')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 1
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [info]', () => {
	const logger = new TestLogger({
		level: 'info'
	})
	expect(logger.level).toBe('info')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 2
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [warn]', () => {
	const logger = new TestLogger({
		level: 'warn'
	})
	expect(logger.level).toBe('warn')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 3
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [error]', () => {
	const logger = new TestLogger({
		level: 'error'
	})
	expect(logger.level).toBe('error')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 4
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [fatal]', () => {
	const logger = new TestLogger({
		level: 'fatal'
	})
	expect(logger.level).toBe('fatal')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 5
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [off]', () => {
	const logger = new TestLogger({
		level: 'off'
	})
	expect(logger.level).toBe('off')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 6
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.testDoLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('logf tmpl', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 48
	})

	const tmpl = 'this is just for %s, it should be %s.'
	const tmplf1 = logger.testBuildLogTmpl(tmpl, 'test', 'worked')
	expect(tmplf1).toBe('this is just for test, it should be worked.     ')

	logger.logfMinCharLen = 32
	const tmplf2 = logger.testBuildLogTmpl(tmpl, 'test', 'worked')
	expect(tmplf2).toBe('this is just for test, it should be worked.')
})
