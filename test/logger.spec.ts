/// <reference types="jest" />
import { Logger, TLevel, TLogFValue, TLogItem, formats } from '../src/index.js'

// eslint-disable-next-line no-control-regex
const ANSI_REGEX = /\x1b\[[0-9;]*m/

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

test('default format colorful browser args', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = {
		document: {}
	}

	try {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			fields: {
				'#comp': 'LacUpdater'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')
		expect(logArgs.length).toBe(6)
		expect(/^%cDEBU%c\[.+\] %s %c#comp%c=LacUpdater$/.test(logArgs[0])).toBe(true)
		expect(logArgs[1]).toBe('color: #56b6c2')
		expect(logArgs[2]).toBe('')
		expect(logArgs[3]).toBe('hello')
		expect(logArgs[4]).toBe('color: #56b6c2')
		expect(logArgs[5]).toBe('')
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('browser env should NEVER produce ANSI escape codes (colorful=true)', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = { document: {} }

	try {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			fields: {
				'#comp': 'MlcViewPanel',
				method: 'test'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'list ner report assets success', { count: 114 })
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		// 所有参数中都不应该出现 ANSI 转义序列 (\u001b[...m)
		for (const arg of logArgs) {
			if (typeof arg === 'string') {
				expect(arg).not.toMatch(ANSI_REGEX)
			}
		}
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('browser env should NEVER produce ANSI escape codes (colorful=false)', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = { document: {} }

	try {
		const logger = new TestLogger({
			level: 'debug',
			colorful: false,
			fields: {
				'#comp': 'MlcViewPanel'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'test message')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		for (const arg of logArgs) {
			if (typeof arg === 'string') {
				expect(arg).not.toMatch(ANSI_REGEX)
			}
		}
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('browser env withField should NOT produce ANSI escape codes', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = { document: {} }

	try {
		const baseLogger = new TestLogger({
			level: 'debug',
			colorful: true
		})

		// 模拟 withField 调用链
		const logger = new TestLogger({
			level: baseLogger.level,
			format: (baseLogger as any).format,
			colorful: (baseLogger as any).colorful,
			fields: {
				...baseLogger.fields,
				'#comp': 'MlcViewPanel'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'list ner report assets success', { count: 114 })
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		for (const arg of logArgs) {
			if (typeof arg === 'string') {
				expect(arg).not.toMatch(ANSI_REGEX)
			}
		}
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('browser env withField colorful inheritance', () => {
	// 不 mock window，测试 withField 是否正确继承 colorful
	const logger = new TestLogger({
		level: 'debug',
		colorful: true
	})

	const withFieldLogger = logger.withField('#comp', 'MlcViewPanel') as TestLogger
	expect(withFieldLogger.colorful).toBe(true)
	expect(withFieldLogger.fields).toEqual({ '#comp': 'MlcViewPanel' })
})

test('non-browser env colorful=true should produce ANSI codes (expected)', () => {
	// 确保非浏览器环境下没有 window 对象
	const previousWindow = (globalThis as any).window
	if (previousWindow !== undefined) {
		delete (globalThis as any).window
	}

	try {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			fields: {
				'#comp': 'MlcViewPanel'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'test message')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		// 非浏览器环境下，ANSI 码是预期的行为
		const hasAnsi = logArgs.some(arg => typeof arg === 'string' && ANSI_REGEX.test(arg))
		expect(hasAnsi).toBe(true)
	} finally {
		if (previousWindow !== undefined) {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('defaultFormat directly: browser env must not produce ANSI', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = { document: {} }

	try {
		const logItem: TLogItem = {
			level: 'debug',
			time: new Date(),
			logs: ['list ner report assets success', { count: 114 }],
			colorful: true,
			fields: {
				'#comp': 'MlcViewPanel'
			}
		}

		const result = formats.default(logItem)

		for (const arg of result) {
			if (typeof arg === 'string') {
				expect(arg).not.toMatch(ANSI_REGEX)
			}
		}
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('browser env colorful=true: format string %c placeholders must match CSS arg count', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = { document: {} }

	try {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			fields: {
				'#comp': 'MlcViewPanel',
				method: 'test'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		// 格式字符串中的 %c 数量应该等于后续参数中 CSS 参数的总数
		// appendBrowserColorText 每次 push 两个 CSS 参数（color + ''）
		const formatStr = logArgs[0] as string
		const pcCount = (formatStr.match(/%c/g) || []).length

		// 统计所有格式占位符（%c, %s, %o, %d, %f 等）
		const placeholderCount = (formatStr.match(/%[csodif]/g) || []).length
		expect(logArgs.length - 1).toBe(placeholderCount)
		expect(pcCount % 2).toBe(0) // %c 应该成对出现
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
})

test('browser env colorful=false should use plain text (no %c, no ANSI)', () => {
	const previousWindow = (globalThis as any).window
	;(globalThis as any).window = { document: {} }

	try {
		const logger = new TestLogger({
			level: 'debug',
			colorful: false,
			fields: {
				'#comp': 'MlcViewPanel',
				method: 'test'
			}
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		const formatStr = logArgs[0] as string

		// colorful=false 时不应有 %c 占位符（无颜色）
		expect(formatStr).not.toContain('%c')

		// 不应有任何 ANSI 转义序列
		for (const arg of logArgs) {
			if (typeof arg === 'string') {
				expect(arg).not.toMatch(ANSI_REGEX)
			}
		}

		// 应该包含纯文本的 level 缩写和 fields
		expect(formatStr).toContain('DEBU')
		expect(formatStr).toContain('#comp=MlcViewPanel')
		expect(formatStr).toContain('method=test')
	} finally {
		if (previousWindow === undefined) {
			delete (globalThis as any).window
		} else {
			;(globalThis as any).window = previousWindow
		}
	}
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
	const json = JSON.parse(logArgs[0])
	expect(json.level).toBe('debug')
	expect(json.method).toBe('test')
	expect(json.module).toBe('module 1')
	expect(json.msg).toBe('test')
	expect(new Date(json.time).toString()).not.toEqual('Invalid Date')
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
	expect(/^level=debug time=.+ msg=test method=test module="module 1"/.test(logArgs[0])).toBe(true)
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

test('logf tmpl with %d integer format', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('count: %d', 42)).toBe('count: 42')
	expect(logger.testBuildLogTmpl('count: %d', -1)).toBe('count: -1')
	expect(logger.testBuildLogTmpl('count: %d', 0)).toBe('count: 0')
	expect(logger.testBuildLogTmpl('count: %i', 99)).toBe('count: 99')
})

test('logf tmpl with %f float format', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('value: %f', 3.14)).toBe('value: 3.14')
	expect(logger.testBuildLogTmpl('value: %.2f', 3.14159)).toBe('value: 3.14')
	expect(logger.testBuildLogTmpl('value: %.0f', 3.9)).toBe('value: 4')
})

test('logf tmpl with %x/%X hex format', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('hex: %x', 255)).toBe('hex: ff')
	expect(logger.testBuildLogTmpl('hex: %X', 255)).toBe('hex: FF')
	expect(logger.testBuildLogTmpl('hex: %04x', 10)).toBe('hex: 000a')
})

test('logf tmpl with %o octal format', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('oct: %o', 8)).toBe('oct: 10')
	expect(logger.testBuildLogTmpl('oct: %o', 10)).toBe('oct: 12')
})

test('logf tmpl with %% literal percent', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('%.2f%%', 87.654)).toBe('87.65%')
	expect(logger.testBuildLogTmpl('%%%s', 'hello')).toBe('%hello')
})

test('logf tmpl with width and alignment', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('[%10s]', 'hi')).toBe('[        hi]')
	expect(logger.testBuildLogTmpl('[%-10s]', 'hi')).toBe('[hi        ]')
	expect(logger.testBuildLogTmpl('[%04d]', 7)).toBe('[0007]')
})

test('logf tmpl with %t boolean format', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('enabled: %t', true)).toBe('enabled: true')
	expect(logger.testBuildLogTmpl('enabled: %t', false)).toBe('enabled: false')
})

test('logf tmpl with mixed format specifiers', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	const result = logger.testBuildLogTmpl('%s has %d messages, %.2f%% done', 'Alice', 5, 87.654)
	expect(result).toBe('Alice has 5 messages, 87.65% done')
})

test('logf tmpl with extra args (more args than placeholders)', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	const result = logger.testBuildLogTmpl('hello %s', 'world', 'extra', 'ignored')
	expect(result).toBe('hello world')
})

test('logf tmpl without args', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	expect(logger.testBuildLogTmpl('no placeholders')).toBe('no placeholders')
	expect(logger.testBuildLogTmpl('hello %s', undefined as any)).toBe('hello undefined')
})

test('logf tmpl with object arg via %s', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	const result = logger.testBuildLogTmpl('data: %s', { id: 1, name: 'test' })
	// sprintf-js 会将对象转为字符串（通过 toString）
	expect(result).toContain('data:')
})

test('logf tmpl respects logfMinCharLen padding', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 48
	})

	const result = logger.testBuildLogTmpl('short')
	expect(result.length).toBe(48)
	expect(result).toBe('short'.padEnd(48, ' '))
})

test('logf tmpl retains original %s behavior for backward compatibility', () => {
	const logger = new TestLogger({
		level: 'debug',
		logfMinCharLen: 0
	})

	const result = logger.testBuildLogTmpl('this is just for %s, it should be %s.', 'test', 'worked')
	expect(result).toBe('this is just for test, it should be worked.')
})

describe('withXxx immutability', () => {
	test('withLevel returns new instance with updated level', () => {
		const logger = new TestLogger({ level: 'debug' })
		const derived = logger.withLevel('error')
		expect(derived.level).toBe('error')
		expect(logger.level).toBe('debug')
		expect(derived).not.toBe(logger)
	})

	test('withColorful returns new instance with updated colorful', () => {
		const logger = new TestLogger({ level: 'debug', colorful: false })
		const derived = logger.withColorful(true)
		expect(derived.colorful).toBe(true)
		expect(logger.colorful).toBe(false)
	})

	test('withField returns new instance with added field', () => {
		const logger = new TestLogger({ level: 'debug', fields: { a: '1' } })
		const derived = logger.withField('b', '2')
		expect(derived.fields).toEqual({ a: '1', b: '2' })
		expect(logger.fields).toEqual({ a: '1' })
	})

	test('withFields returns new instance with merged fields', () => {
		const logger = new TestLogger({ level: 'debug', fields: { a: '1' } })
		const derived = logger.withFields({ b: '2', c: '3' })
		expect(derived.fields).toEqual({ a: '1', b: '2', c: '3' })
		expect(logger.fields).toEqual({ a: '1' })
	})

	test('withError returns new instance with error set', () => {
		const logger = new TestLogger({ level: 'debug' })
		const err = new Error('boom')
		const derived = logger.withError(err)
		expect(derived.err).toBe(err)
		expect(logger.err).toBeUndefined()
	})

	test('withXxx chain preserves format and hooks', () => {
		const logger = new TestLogger({
			level: 'debug',
			format: formats.json,
			logfMinCharLen: 64,
			logHooks: [{ levels: ['error'], callback: () => {} }]
		})
		const derived = logger.withLevel('warn').withField('x', 'y')
		expect(derived.logfMinCharLen).toBe(64)
		expect(derived.fields).toHaveProperty('x')
	})
})

describe('default format edge cases', () => {
	test('default format with error includes error message', () => {
		const logger = new TestLogger({
			level: 'error',
			colorful: false,
			logfMinCharLen: 0,
			err: new Error('something went wrong')
		})

		const logArgs = logger.testBuildLogArgs('error', 'failed')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		const joined = logArgs.join(' ')
		expect(joined).toContain('something went wrong')
	})

	test('default format with no fields and no error', () => {
		const logger = new TestLogger({
			level: 'info',
			colorful: false,
			logfMinCharLen: 0
		})

		const logArgs = logger.testBuildLogArgs('info', 'minimal')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')
		expect(logArgs[0]).toMatch(/^INFO\[.+\]$/)
		expect(logArgs[1]).toBe('minimal')
	})

	test('default format with empty logs', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: false,
			logfMinCharLen: 0
		})

		const logArgs = logger.testBuildLogArgs('debug')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')
		expect(logArgs[0]).toMatch(/^DEBU\[.+\]$/)
	})
})

describe('JSON and text format with error', () => {
	test('json format includes error.message', () => {
		const logger = new TestLogger({
			level: 'error',
			colorful: false,
			format: formats.json,
			err: new Error('json error')
		})

		const logArgs = logger.testBuildLogArgs('error', 'boom')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		const json = JSON.parse(logArgs[0])
		expect(json.error).toBe('json error')
	})

	test('text format includes error field', () => {
		const logger = new TestLogger({
			level: 'error',
			colorful: false,
			format: formats.text,
			err: new Error('text error')
		})

		const logArgs = logger.testBuildLogArgs('error', 'boom')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')
		expect(logArgs[0]).toContain('error="text error"')
	})
})

describe('terminal ANSI colorful', () => {
	test('default format has ANSI codes when colorful=true', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			logfMinCharLen: 0
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')
		// eslint-disable-next-line no-control-regex
		expect(logArgs[0]).toMatch(/\u001b\[\d+m/)
	})

	test('ANSI color differs by level', () => {
		const debugLogger = new TestLogger({ level: 'debug', colorful: true, logfMinCharLen: 0 })
		const errorLogger = new TestLogger({ level: 'error', colorful: true, logfMinCharLen: 0 })

		const debugArgs = debugLogger.testBuildLogArgs('debug', 'test')
		const errorArgs = errorLogger.testBuildLogArgs('error', 'test')

		expect(debugArgs).toBeDefined()
		expect(errorArgs).toBeDefined()
		if (!debugArgs || !errorArgs) throw new Error('failed to build log args')

		// eslint-disable-next-line no-control-regex
		const debugCode = (debugArgs[0] as string).match(/\u001b\[(\d+)m/)
		// eslint-disable-next-line no-control-regex
		const errorCode = (errorArgs[0] as string).match(/\u001b\[(\d+)m/)
		expect(debugCode).not.toBeNull()
		expect(errorCode).not.toBeNull()
		// debug=36(cyan), error=31(red)
		expect(debugCode![1]).not.toBe(errorCode![1])
	})
})

describe('sprintf additional format specifiers', () => {
	test('logf tmpl with %b binary format', () => {
		const logger = new TestLogger({ level: 'debug', logfMinCharLen: 0 })
		expect(logger.testBuildLogTmpl('bin: %b', 5)).toBe('bin: 101')
		expect(logger.testBuildLogTmpl('bin: %b', 10)).toBe('bin: 1010')
	})

	test('logf tmpl with %e scientific notation', () => {
		const logger = new TestLogger({ level: 'debug', logfMinCharLen: 0 })
		expect(logger.testBuildLogTmpl('sci: %e', 1000)).toBe('sci: 1e+3')
		expect(logger.testBuildLogTmpl('sci: %e', 42)).toBe('sci: 4.2e+1')
	})

	test('logf tmpl with %u unsigned decimal', () => {
		const logger = new TestLogger({ level: 'debug', logfMinCharLen: 0 })
		expect(logger.testBuildLogTmpl('unsigned: %u', 42)).toBe('unsigned: 42')
	})

	test('logf tmpl with all specifier types combined', () => {
		const logger = new TestLogger({ level: 'debug', logfMinCharLen: 0 })
		const result = logger.testBuildLogTmpl(
			'%s: dec=%d hex=0x%X bin=%b sci=%.2e', 'test', 255, 255, 7, 1234.5
		)
		expect(result).toBe('test: dec=255 hex=0xFF bin=111 sci=1.23e+3')
	})
})

describe('log hooks edge cases', () => {
	test('multiple hooks all fire for matching level', () => {
		let count = 0
		const logger = new TestLogger({ level: 'debug' })
			.addLogHooks([
				{ levels: ['error'], callback: () => { count++ } },
				{ levels: ['error', 'fatal'], callback: () => { count++ } }
			])

		logger.error('test')
		expect(count).toBe(2)
	})

	test('hook does not fire for non-matching level', () => {
		let fired = false
		const logger = new TestLogger({ level: 'debug' })
			.addLogHooks([{ levels: ['error'], callback: () => { fired = true } }])

		logger.info('test')
		expect(fired).toBe(false)
	})

	test('addLogHooks returns ILogger for chaining', () => {
		const logger = new TestLogger({ level: 'debug' })
		const result = logger.addLogHooks([{ levels: ['info'], callback: () => {} }])
		expect(result).toBe(logger)
	})

	test('hook receives complete logItem with fields and logs', () => {
		let captured: TLogItem | null = null
		const logger = new TestLogger({
			level: 'debug',
			fields: { service: 'test-svc' }
		}).addLogHooks([{
			levels: ['warn'],
			callback: (logItem) => { captured = logItem }
		}])

		logger.warn('caution')
		expect(captured).not.toBeNull()
		expect(captured!.level).toBe('warn')
		expect(captured!.fields).toEqual({ service: 'test-svc' })
		expect(captured!.logs).toEqual(['caution'])
	})
})

describe('browser colorful (%c CSS style)', () => {
	const originalWindow = global.window as any

	beforeEach(() => {
		(global as any).window = { document: {} }
	})

	afterEach(() => {
		(global as any).window = originalWindow
	})

	test('default format uses %c CSS in browser when colorful=true', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			logfMinCharLen: 0,
			fields: { method: 'test' }
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		// 第一个参数应包含 %c 标记
		expect(logArgs[0]).toContain('%c')
		// 应有 CSS 样式参数（color + reset 对）
		const cssArgs = logArgs.slice(1)
		expect(cssArgs.length).toBeGreaterThan(0)
	})

	test('default format has no %c when colorful=false in browser', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: false,
			logfMinCharLen: 0,
			fields: { method: 'test' }
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		expect(logArgs[0]).not.toContain('%c')
	})

	test('default format CSS args count matches %c markers when colorful=true', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			logfMinCharLen: 0,
			fields: { method: 'test', module: 'app' }
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		const cCount = ((logArgs[0] as string).match(/%c/g) || []).length
		const cssArgs = logArgs.filter((arg, index) => {
			return index > 0 && typeof arg === 'string' && (arg.startsWith('color:') || arg === '')
		})
		expect(cssArgs.length).toBe(cCount)
		expect(cssArgs.length).toBeGreaterThan(0)
		expect(cssArgs.length % 2).toBe(0)
	})

	test('text format uses %c CSS in browser when colorful=true', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			logfMinCharLen: 0,
			format: formats.text
		})

		const logArgs = logger.testBuildLogArgs('debug', 'hello')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		expect(logArgs[0]).toContain('%c')
	})

	test('json format has no %c regardless of colorful in browser', () => {
		const logger = new TestLogger({
			level: 'debug',
			colorful: true,
			logfMinCharLen: 0,
			format: formats.json
		})

		const logArgs = logger.testBuildLogArgs('debug', 'test')
		expect(logArgs).toBeDefined()
		if (!logArgs) throw new Error('failed to build log args')

		expect(logArgs[0]).not.toContain('%c')
	})
})
