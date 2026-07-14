import { TLevel, TLogFormatFn, TLogItem } from './interface.js'
import { formatTime } from './time.js'

const colorTmpls: {
	[lvl: string]: string
} = {
	trace: '\x1b[90m%s\x1b[0m',
	debug: '\x1b[36m%s\x1b[0m',
	info: '\x1b[36m%s\x1b[0m',
	warn: '\x1b[33m%s\x1b[0m',
	error: '\x1b[31m%s\x1b[0m',
	fatal: '\x1b[31m%s\x1b[0m',
	panic: '\x1b[31m%s\x1b[0m'
}

const colorCSS: Record<string, string> = {
	trace: 'color: #999',
	debug: 'color: #56b6c2',
	info: 'color: #56b6c2',
	warn: 'color: #e5c07b',
	error: 'color: #e06c75; font-weight: bold',
	fatal: 'color: #e06c75; font-weight: bold',
	panic: 'color: #e06c75; font-weight: bold'
}

const levelAbbrs: {
	[lvl: string]: string
} = {
	trace: 'TRAC',
	debug: 'DEBU',
	info: 'INFO',
	warn: 'WARN',
	error: 'ERRO',
	fatal: 'FATA',
	panic: 'PANI'
}

let _cssStyles: string[] = []

function isBrowserEnv (): boolean {
	return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

function buildColorFont (str: string, level: string): string {
	const tmpl = colorTmpls[level]
	return tmpl ? tmpl.replace('%s', `${str}`) : str
}

function applyColor (str: string, level: string, colorful: boolean): string {
	if (!colorful) return str
	if (isBrowserEnv()) {
		const css = colorCSS[level] || ''
		_cssStyles.push(css, '')
		return `%c${str}%c`
	}
	return buildColorFont(str, level)
}

function buildText (level: TLevel, key: string, value: string, colorful?: boolean): string {
	return `${applyColor(key, level, !!colorful)}=${/\s/.test(value) ? `"${value}"` : value}`
}

function escapeConsoleFormat (str: string): string {
	return str.replace(/%/g, '%%')
}

function appendBrowserText (out: any[], str: string): void {
	out[0] += escapeConsoleFormat(str)
}

function appendBrowserColorText (out: any[], str: string, level: string): void {
	out[0] += `%c${escapeConsoleFormat(str)}%c`
	out.push(colorCSS[level] || '', '')
}

function appendBrowserLogValue (out: any[], value: any): void {
	out[0] += typeof value === 'string' ? '%s' : '%o'
	out.push(value)
}

function buildBrowserDefaultArgs (logItem: TLogItem): any[] {
	const { level, time, logs, colorful, error, fields } = logItem
	const out: any[] = ['']

	if (colorful) {
		appendBrowserColorText(out, levelAbbrs[level] ? levelAbbrs[level] : level, level)
	} else {
		appendBrowserText(out, levelAbbrs[level] ? levelAbbrs[level] : level)
	}
	appendBrowserText(out, `[${formatTime(time)}]`)

	if (logs && logs.length > 0) {
		logs.forEach(log => {
			appendBrowserText(out, ' ')
			appendBrowserLogValue(out, log)
		})
	}

	for (const key in fields) {
		const value = `${fields[key]}`
		appendBrowserText(out, ' ')
		if (colorful) {
			appendBrowserColorText(out, key, level)
		} else {
			appendBrowserText(out, key)
		}
		appendBrowserText(out, `=${/\s/.test(value) ? `"${value}"` : value}`)
	}

	if (error && error instanceof Error) {
		appendBrowserText(out, ' ')
		if (colorful) {
			appendBrowserColorText(out, 'error', level)
		} else {
			appendBrowserText(out, 'error')
		}
		appendBrowserText(out, `="${error.message}"`)
	}

	return out
}

const defaultFormat: TLogFormatFn = function (logItem) {
	_cssStyles = []
	const { level, time, logs, colorful, error, fields } = logItem
	if (isBrowserEnv()) return buildBrowserDefaultArgs(logItem)
	let out: any[] = []

	let levelStr = `${levelAbbrs[level] ? levelAbbrs[level] : level}`
	levelStr = applyColor(levelStr, level, colorful)
	const timeStr = formatTime(time)
	out.push(`${levelStr}[${timeStr}]`)

	if (logs && logs.length > 0) out = out.concat(logs)

	for (const key in fields) {
		out.push(buildText(level, key, `${fields[key]}`, colorful))
	}

	if (error && error instanceof Error) {
		const errStr = `${applyColor('error', level, colorful)}="${error.message}"`
		out.push(errStr)
	}

	return out.concat(_cssStyles)
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
	_cssStyles = []
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

	return [out.join(' ')].concat(_cssStyles)
}

export const formats = {
	default: defaultFormat,
	json: jsonFormat,
	text: textFormat
}
