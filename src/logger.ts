import { formatTime } from './time'

export type TLevel = 'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'off'

export type TTimeFormatFn = (time: Date) => string

export type TFields = {
	[field: string]: string|number|boolean
}

export class Logger {
	private levels: TLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'off']
	private currentLevelIndex: number
	private colorTmpls: {
		[lvl: string]: string
	} = {
		trace: '\x1b[90m%s\x1b[0m',
		debug: '\x1b[36m%s\x1b[0m',
		info: '\x1b[36m%s\x1b[0m',
		warn: '\x1b[33m%s\x1b[0m',
		error: '\x1b[31m%s\x1b[0m',
		fatal: '\x1b[31m%s\x1b[0m'
	}

	public level: TLevel
	public timeFormatFn: TTimeFormatFn = formatTime
	public colorful: boolean = false
	public levelAbbrs: {
		[lvl: string]: string
	} = {
		trace: 'TRAC',
		debug: 'DEBU',
		info: 'INFO',
		warn: 'WARN',
		error: 'ERRO',
		fatal: 'FATA'
	}

	public fields: TFields = {}
	public err: Error | undefined

	constructor (option: {
		level: TLevel
		timeFormatFn?: TTimeFormatFn
		fields?: TFields
		err?: Error
		colorful?: boolean
	}) {
		this.level = option.level
		this.currentLevelIndex = this.levels.findIndex(item => item === option.level)
		if (option.timeFormatFn !== undefined) this.timeFormatFn = option.timeFormatFn
		if (option.fields !== undefined) this.fields = option.fields
		if (option.err !== undefined) this.err = option.err
		if (option.colorful !== undefined) this.colorful = option.colorful
	}

	private _log (level: string, log?: any[]): void {
		if (!this.doLevelCheck(level)) return
		console.log(
			this.buildPrefix(level), ...(log || []),
			this.buildFields(this.fields, level),
			this.err && this.err instanceof Error ? this.buildErr(this.err, 'error') : ''
		)
	}

	public doLevelCheck (level: string) {
		const logLevel = this.levels.findIndex(item => item === level)
		return logLevel >= this.currentLevelIndex
	}

	public buildPrefix (level: string): string {
		if (!this.doLevelCheck(level)) return ''
		let levelStr = `${this.levelAbbrs[level] ? this.levelAbbrs[level] : level}`
		if (this.colorful) {
			levelStr = this.buildColorFont(levelStr, level)
		}
		const now = this.timeFormatFn(new Date())
		return `${levelStr}[${now}]`
	}

	public buildColorFont (str: string, level: string) {
		const tmpl = this.colorTmpls[level]
		return tmpl ? tmpl.replace('%s', `${str}`) : str
	}

	public buildFields (fields: TFields, level: string): string {
		return Object.entries(fields).map(item => {
			let keyStr = item[0]
			if (this.colorful) {
				keyStr = this.buildColorFont(keyStr, level)
			}
			const valStr = item[1]
			return `${keyStr}=${valStr}`
		}).join(' ').replace(/\s$/, '')
	}

	public buildErr (err: Error, level: string) {
		return err ? `${this.buildColorFont('error', level)}="${err.message}"` : ''
	}

	public withField (field: string, value: string|number|boolean) {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: {
				...this.fields,
				[field]: value
			}
		})
	}

	public withFields (fields: TFields) {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: {
				...this.fields,
				...fields
			}
		})
	}

	public withError (err: Error) {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: this.fields,
			err: err
		})
	}

	public trace (...log: any[]) {
		this._log('trace', log)
	}

	public debug (...log: any[]) {
		this._log('debug', log)
	}

	public info (...log: any[]) {
		this._log('info', log)
	}

	public warn (...log: any[]) {
		this._log('warn', log)
	}

	public error (...log: any[]) {
		this._log('error', log)
	}

	public fatal (...log: any[]) {
		this._log('fatal', log)
	}
}
