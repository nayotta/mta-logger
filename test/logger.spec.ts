import { Logger } from '../src'

test('basic', () => {
	const logger = new Logger({
		level: 'info',
		position: 'test',
		timeFormat: 'YYYY/MM/DD HH:mm:ss'
	})
	expect(logger.level).toBe('info')
	expect(logger.timeFormat).toBe('YYYY/MM/DD HH:mm:ss')

	// log prefix
	const logPrefix = logger.buildPrefix('warn')
	expect(/^\[warn\].+\[test\]$/.test(logPrefix)).toBe(true)
})

test('without position', () => {
	const logger = new Logger({
		level: 'all',
		timeFormat: 'YYYY/MM/DD HH:mm:ss'
	})

	const logPrefix = logger.buildPrefix('warn') as string
	expect(/^\[warn\].+\[.+\]$/.test(logPrefix)).toBe(false)
})

test('level [all]', () => {
	const logger = new Logger({
		level: 'all'
	})
	expect(logger.level).toBe('all')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		expect(levelPass).toBe(true)
	}
})

test('level [trace]', () => {
	const logger = new Logger({
		level: 'trace'
	})
	expect(logger.level).toBe('trace')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 0
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [debug]', () => {
	const logger = new Logger({
		level: 'debug'
	})
	expect(logger.level).toBe('debug')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 1
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [info]', () => {
	const logger = new Logger({
		level: 'info'
	})
	expect(logger.level).toBe('info')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 2
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [warn]', () => {
	const logger = new Logger({
		level: 'warn'
	})
	expect(logger.level).toBe('warn')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 3
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [error]', () => {
	const logger = new Logger({
		level: 'error'
	})
	expect(logger.level).toBe('error')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 4
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [fatal]', () => {
	const logger = new Logger({
		level: 'fatal'
	})
	expect(logger.level).toBe('fatal')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 5
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})

test('level [off]', () => {
	const logger = new Logger({
		level: 'off'
	})
	expect(logger.level).toBe('off')

	const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
	const logLevelIndex = 6
	for (let i = 0; i < logLevels.length; i++) {
		const levelPass = logger.doLevelCheck(logLevels[i])
		if (i >= logLevelIndex) {
			expect(levelPass).toBe(true)
		} else {
			expect(levelPass).toBe(false)
		}
	}
})
