export function formatTime (date: Date|number|string) {
	if (!date) return ''
	const d = new Date(date)
	if (!d) return ''
	const year = d.getFullYear()
	const month = d.getMonth() + 1
	const day = d.getDate()
	const hour = d.getHours()
	const minute = d.getMinutes()
	const second = d.getSeconds()
	const milli = d.getMilliseconds()
	const offset = getTimezone(d)

	return `${year}-${formatDateNumber(month)}-${formatDateNumber(day)}T${formatDateNumber(hour)}:${formatDateNumber(minute)}:${formatDateNumber(second)}.${formatDateNumber(milli, 3)}${offset}`
}

function getTimezone (time: Date): string {
	const offset = time.getTimezoneOffset()
	const offsetOp = offset < 0 ? '+' : '-'
	const offsetHour = formatDateNumber(Math.abs(offset) / 60)
	const offsetMin = formatDateNumber(Math.abs(offset) % 60)
	return `${offsetOp}${offsetHour}:${offsetMin}`
}

function formatDateNumber (n: number|string, len?: number): string {
	n = n.toString()
	len = len || 2
	if (n.length < len) {
		const nlen = n.length
		for (let i = 0; i < len - nlen; i++) {
			n = `0${n}`
		}
	}
	return n
}
