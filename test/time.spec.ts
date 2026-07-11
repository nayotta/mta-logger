import { formatTime } from '../src/time.js'

test('basic date object', () => {
	const d = new Date('2006-01-02 15:04:05.000')
	const dS = formatTime(d)
	expect(/^2006-01-02T15:04:05\.000/.test(dS)).toBe(true)
})

test('timestamp number (milliseconds)', () => {
	const ts = new Date('2020-06-15T10:30:00.500Z').getTime()
	const result = formatTime(ts)
	expect(result).toMatch(/^2020-06-15T/)
	expect(result).toContain(':30:00.500')
})

test('ISO string input', () => {
	const result = formatTime('2023-01-01T00:00:00.000Z')
	expect(result).toMatch(/^2023-01-01T/)
	expect(result).toMatch(/\d{2}:00:00\.000/)
})

test('now (current time)', () => {
	const result = formatTime(new Date())
	expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/)
})

test('timezone offset format', () => {
	const result = formatTime(new Date('2023-01-01T12:00:00Z'))
	// should contain timezone offset like +08:00 or -05:00
	expect(result).toMatch(/[+-]\d{2}:\d{2}$/)
})

test('leap year date', () => {
	const result = formatTime(new Date('2024-02-29T12:00:00Z'))
	expect(result).toContain('2024-02-29')
})

test('empty string returns empty', () => {
	expect(formatTime('')).toBe('')
})

test('nullish input returns empty', () => {
	expect(formatTime(null as any)).toBe('')
	expect(formatTime(undefined as any)).toBe('')
})

test('invalid date string produces NaN placeholders', () => {
	// formatTime does not validate date — it formats whatever Date produces
	const result = formatTime('not-a-date')
	expect(result).toContain('NaN')
})
