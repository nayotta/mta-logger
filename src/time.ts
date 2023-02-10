export function formatTime (date: Date|number|string) {
	if (!date) return ''
	const dateFormat = new Date(date)
	if (!dateFormat) return ''
	let out = 'YYYY-MM-DD hh:mm:ss.SSS'
	const year = dateFormat.getFullYear()
	const month = dateFormat.getMonth() + 1
	const day = dateFormat.getDate()
	const hour = dateFormat.getHours()
	const minute = dateFormat.getMinutes()
	const second = dateFormat.getSeconds()
	const milli = dateFormat.getMilliseconds()

	out = out.replace(/YYYY/g, `${year}`)
		.replace(/YY/g, year.toString().substring(year.toString().length - 2))
		.replace(/MM/g, formatDateNumber(`${month}`))
		.replace(/M/g, `${month}`)
		.replace(/DD/g, formatDateNumber(`${day}`))
		.replace(/D/g, `${day}`)
		.replace(/hh/g, formatDateNumber(`${hour}`))
		.replace(/h/g, `${hour}`)
		.replace(/mm/g, formatDateNumber(`${minute}`))
		.replace(/m/g, `${minute}`)
		.replace(/ss/g, formatDateNumber(`${second}`))
		.replace(/s/g, `${second}`)
		.replace(/SSS/g, `${milli}`)

	return out
}

const formatDateNumber = (n: number|string) => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
