import { formatTime } from '../src/time'

test('basic', () => {
	const s = '2023-02-12 10:32:43.322'
	const d = new Date(s)
	const dS = formatTime(d)
	expect(dS).toBe(s)
})
