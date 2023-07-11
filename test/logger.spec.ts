import { Logger, TLevel, TLogFValue, TLogItem, formats } from '../src'

class TestLogger extends Logger {
	public testDoLevelCheck (level: string): boolean {
		return this.doLevelCheck(level)
	}

	public testBuildLogTmpl (tmpl: string, ...args: TLogFValue[]): string {
		return this._buildLogTmpl(tmpl, args)
	}

	public testBuildLogArgs (level: TLevel, ...args: any[]): any[]|undefined {
		return this._buildLogArgs(level, args)
	}
}

test('level [trace]', () => {
	const logger = new TestLogger({
		level: 'trace'
	})
	expect(logger.level).toBe('trace')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

test('level [panic]', () => {
	const logger = new TestLogger({
		level: 'panic'
	})
	expect(logger.level).toBe('panic')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
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

test('level [off]', () => {
	const logger = new TestLogger({
		level: 'off'
	})
	expect(logger.level).toBe('off')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic']
	const logLevelIndex = 7
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

	const tmplf3 = logger.testBuildLogTmpl(tmpl, 'test', undefined as any)
	expect(tmplf3).toBe('this is just for test, it should be undefined.')

	const tmplf4 = logger.testBuildLogTmpl(tmpl, 'test', null as any)
	expect(tmplf4).toBe('this is just for test, it should be null.')
})

test('default format', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 48,
		colorful: false,
		fields: {
			method: 'test',
			module: 'module 1'
		}
	})

	const logArgs = logger.testBuildLogArgs('debug', 'hello', 'world')
	expect(logArgs).toBeDefined()
	if (!logArgs) throw new Error('failed to build log args')
	expect(logArgs.length).toBe(5)
	expect(/^DEBU\[.+\]/.test(logArgs[0])).toBe(true)
	expect(logArgs[1]).toBe('hello')
	expect(logArgs[2]).toBe('world')
	expect(logArgs[3]).toBe('method=test')
	expect(logArgs[4]).toBe('module="module 1"')
})

test('json format', () => {
	const logger = new TestLogger({
		level: 'debug',
		colorful: false,
		fields: {
			method: 'test',
			module: 'module 1'
		},
		format: formats.json
	})

	const logArgs = logger.testBuildLogArgs('debug', 'test')
	expect(logArgs).toBeDefined()
	if (!logArgs) throw new Error('failed to build log args')
	expect(logArgs.length).toBe(1)
	expect(/^\{"level":"debug","time":".+","method":"test","module":"module 1","msg":"test"\}/.test(logArgs[0])).toBe(true)
})

test('test format', () => {
	const logger = new TestLogger({
		level: 'debug',
		colorful: false,
		fields: {
			method: 'test',
			module: 'module 1'
		},
		format: formats.text
	})

	const logArgs = logger.testBuildLogArgs('debug', 'test')
	expect(logArgs).toBeDefined()
	if (!logArgs) throw new Error('failed to build log args')
	expect(logArgs.length).toBe(1)
	expect(/^level=debug time=".+" msg=test method=test module="module 1"/.test(logArgs[0])).toBe(true)
})

test('log hook', () => {
	let logi: TLogItem = {
		level: '' as TLevel,
		time: new Date(),
		colorful: false,
		fields: {}
	}
	const logger = new TestLogger({
		level: 'debug',
		fields: {
			method: 'test'
		}
	}).addLogHooks([{
		levels: ['error', 'fatal', 'panic'],
		callback: async function (logItem) {
			logi = logItem
			return {
				through: false
			}
		}
	}])
	logger.debug('test')
	expect(logi.level).toBe('')
	logger.error('test')
	expect(logi.level).toBe('error')
	logger.fatal('test')
	expect(logi.level).toBe('fatal')
	logger.panic('test')
	expect(logi.level).toBe('panic')
	logger.debug('test')
	expect(logi.level).toBe('panic')
})
