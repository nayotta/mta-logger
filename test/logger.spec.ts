import { Logger } from '../src'

test('basic', () => {
	const logger = new Logger({
		level: 'info',
		colorful: false
	})
	expect(logger.level).toBe('info')

	// log prefix
	const logPrefix = logger.buildPrefix('warn')
	console.log('prefix:', logPrefix)
	expect(/^WARN\[\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{1,}\]$/.test(logPrefix)).toBe(true)
})

test('without position', () => {
	const logger = new Logger({
		level: 'trace'
	})

	const logPrefix = logger.buildPrefix('warn') as string
	expect(/^\[warn\].+\[.+\]$/.test(logPrefix)).toBe(false)
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
