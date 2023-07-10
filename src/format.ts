import { TLevel, TLogFormatFn } from './interface'
import { formatTime } from './time'

const colorTmpls: {
	[lvl: string]: string
} = {
	trace: '\x1b[90m%s\x1b[0m',
	debug: '\x1b[36m%s\x1b[0m',
	info: '\x1b[36m%s\x1b[0m',
	warn: '\x1b[33m%s\x1b[0m',
	error: '\x1b[31m%s\x1b[0m',
	fatal: '\x1b[31m%s\x1b[0m'
}

const levelAbbrs: {
	[lvl: string]: string
} = {
	trace: 'TRAC',
	debug: 'DEBU',
	info: 'INFO',
	warn: 'WARN',
	error: 'ERRO',
	fatal: 'FATA'
}

function buildColorFont (str: string, level: string): string {
	const tmpl = colorTmpls[level]
	return tmpl ? tmpl.replace('%s', `${str}`) : str
}

function buildText (level: TLevel, key: string, value: string, colorful?: boolean): string {
	return `${colorful ? buildColorFont(key, level) : key}=${/\s/.test(value) ? `"${value}"` : value}`
}

const defaultFormat: TLogFormatFn = function (logItem) {
	const { level, time, logs, colorful, error, fields } = logItem
	let out: any[] = []

	let levelStr = `${levelAbbrs[level] ? levelAbbrs[level] : level}`
	if (colorful) {
		levelStr = buildColorFont(levelStr, level)
	}
	const timeStr = formatTime(time)
	out.push(`${levelStr}[${timeStr}]`)

	if (logs && logs.length > 0) out = out.concat(logs)

	for (const key in fields) {
		out.push(buildText(level, key, `${fields[key]}`, colorful))
	}

	if (error && error instanceof Error) {
		const errStr = `${buildColorFont('error', level)}="${error.message}"`
		out.push(errStr)
	}

	return out
}

const jsonFormat: TLogFormatFn = function (logItem) {
	const { level, time, logs, error, fields = {} } = logItem

	const json: {
		[key: string]: any
	} = {
		level,
		time: formatTime(time),
		...fields
	}
	if (logs && logs.length > 0) {
		json.msg = logs.join(' ').trim()
	}
	if (error) json.error = error.message
	for (const key in fields) {
		json[key] = fields[key]
	}

	return [JSON.stringify(json)]
}

const textFormat: TLogFormatFn = function (logItem) {
	const { colorful, level, time, logs, error, fields = {} } = logItem
	const out: any[] = []

	out.push(buildText(level, 'level', level, colorful))
	out.push(buildText(level, 'time', formatTime(time), colorful))

	if (logs && logs.length > 0) {
		out.push(buildText(level, 'msg', `${logs.join(' ').trim()}`, colorful))
	}
	if (error) out.push(buildText(level, 'error', error.message, colorful))
	for (const key in fields) {
		out.push(buildText(level, key, `${fields[key]}`, colorful))
	}

	return [out.join(' ')]
}

export const formats = {
	default: defaultFormat,
	json: jsonFormat,
	text: textFormat
}
