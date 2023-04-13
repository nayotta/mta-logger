import { TFields, TLevel, TLogFValue, TTimeFormatFn } from './type'
import { ILogger } from './interface'
import { formatTime } from './time'

export class Logger implements ILogger {
	protected levels: TLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'off']
	protected currentLevelIndex: number
	protected colorTmpls: {
		[lvl: string]: string
	} = {
		trace: '\x1b[90m%s\x1b[0m',
		debug: '\x1b[36m%s\x1b[0m',
		info: '\x1b[36m%s\x1b[0m',
		warn: '\x1b[33m%s\x1b[0m',
		error: '\x1b[31m%s\x1b[0m',
		fatal: '\x1b[31m%s\x1b[0m'
	}

	protected timeFormatFn: TTimeFormatFn = formatTime
	protected levelAbbrs: {
		[lvl: string]: string
	} = {
		trace: 'TRAC',
		debug: 'DEBU',
		info: 'INFO',
		warn: 'WARN',
		error: 'ERRO',
		fatal: 'FATA'
	}

	public level: TLevel
	public colorful: boolean = true
	public logfMinCharLen: number = 32
	public fields: TFields = {}
	public err: Error | undefined

	constructor (option: {
		level: TLevel
		timeFormatFn?: TTimeFormatFn
		fields?: TFields
		err?: Error
		colorful?: boolean
		logfMinCharLen?: number
	}) {
		this.level = option.level
		this.currentLevelIndex = this.levels.findIndex(item => item === option.level)
		if (option.timeFormatFn !== undefined) this.timeFormatFn = option.timeFormatFn
		if (option.fields !== undefined) this.fields = option.fields
		if (option.err !== undefined) this.err = option.err
		if (option.colorful !== undefined) this.colorful = option.colorful
		if (option.logfMinCharLen !== undefined) this.logfMinCharLen = option.logfMinCharLen
	}

	protected _log (level: string, log?: any[]): void {
		if (!this.doLevelCheck(level)) return
		console.log(
			this.buildPrefix(level), ...(log || []),
			this.buildFields(this.fields, level),
			this.err && this.err instanceof Error ? this.buildErr(this.err, 'error') : ''
		)
	}

	protected doLevelCheck (level: string) {
		const logLevel = this.levels.findIndex(item => item === level)
		return logLevel >= this.currentLevelIndex
	}

	protected buildPrefix (level: string): string {
		if (!this.doLevelCheck(level)) return ''
		let levelStr = `${this.levelAbbrs[level] ? this.levelAbbrs[level] : level}`
		if (this.colorful) {
			levelStr = this.buildColorFont(levelStr, level)
		}
		const now = this.timeFormatFn(new Date())
		return `${levelStr}[${now}]`
	}

	protected buildColorFont (str: string, level: string): string {
		const tmpl = this.colorTmpls[level]
		return tmpl ? tmpl.replace('%s', `${str}`) : str
	}

	protected buildFields (fields: TFields, level: string): string {
		return Object.entries(fields).map(item => {
			let keyStr = item[0]
			if (this.colorful) {
				keyStr = this.buildColorFont(keyStr, level)
			}
			const valStr = item[1]
			return `${keyStr}=${valStr}`
		}).join(' ').replace(/\s$/, '')
	}

	protected buildErr (err: Error, level: string): string {
		return err ? `${this.buildColorFont('error', level)}="${err.message}"` : ''
	}

	public withLevel (level: TLevel): Logger {
		return new Logger({
			level: level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: this.fields,
			err: this.err
		})
	}

	public withColorful (colorful: boolean): Logger {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: colorful,
			fields: this.fields,
			err: this.err
		})
	}

	public withField (field: string, value: string|number|boolean): Logger {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: {
				...this.fields,
				[field]: value
			},
			err: this.err
		})
	}

	public withFields (fields: TFields): Logger {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: {
				...this.fields,
				...fields
			},
			err: this.err
		})
	}

	public withError (err: Error): Logger {
		return new Logger({
			level: this.level,
			timeFormatFn: this.timeFormatFn,
			colorful: this.colorful,
			fields: this.fields,
			err: err
		})
	}

	public trace (...log: any[]): void {
		this._log('trace', log)
	}

	public debug (...log: any[]): void {
		this._log('debug', log)
	}

	public info (...log: any[]): void {
		this._log('info', log)
	}

	public warn (...log: any[]): void {
		this._log('warn', log)
	}

	public error (...log: any[]): void {
		this._log('error', log)
	}

	public fatal (...log: any[]): void {
		this._log('fatal', log)
	}

	protected _logf (level: string, tmpl: string, args?: TLogFValue[]): void {
		if (!this.doLevelCheck(level)) return
		console.log(
			this.buildPrefix(level),
			this._buildLogTmpl(tmpl, args),
			this.buildFields(this.fields, level),
			this.err && this.err instanceof Error ? this.buildErr(this.err, 'error') : ''
		)
	}

	protected _buildLogTmpl (tmpl: string, args?: TLogFValue[]): string {
		let out = tmpl
		if (args && args.length > 0) {
			args.forEach(item => {
				out = out.replace(/%s/, `${item}`)
			})
		}
		return out.length < this.logfMinCharLen ? out.padEnd(this.logfMinCharLen, ' ') : out
	}

	public tracef (tmpl: string, ...args: TLogFValue[]): void {
		this._logf('trace', tmpl, args)
	}

	public debugf (tmpl: string, ...args: TLogFValue[]): void {
		this._logf('debug', tmpl, args)
	}

	public infof (tmpl: string, ...args: TLogFValue[]): void {
		this._logf('info', tmpl, args)
	}

	public warnf (tmpl: string, ...args: TLogFValue[]): void {
		this._logf('warn', tmpl, args)
	}

	public errorf (tmpl: string, ...args: TLogFValue[]): void {
		this._logf('error', tmpl, args)
	}

	public fatalf (tmpl: string, ...args: TLogFValue[]): void {
		this._logf('fatal', tmpl, args)
	}
}
