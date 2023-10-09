import { formatTime } from '../src/time.js'

test('basic', () => {
	const s = '2006-01-02 15:04:05.000'
	const d = new Date(s)
	const dS = formatTime(d)
	expect(/^2006-01-02T15:04:05\.000/.test(dS)).toBe(true)
})
