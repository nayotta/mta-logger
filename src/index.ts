import * as dayjs from 'dayjs'

export type TLevel = 'all'|'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'off'

export class Logger {
	private levels: TLevel[] = ['all', 'trace', 'debug', 'info', 'warn', 'error', 'fatal', 'off']
	private currentLevelIndex: number
	public level: string
	public position: string = ''
	public timeFormat: string = 'YYYY-MM-DDTHH:mm:ss:SSS'
	public mark: boolean
	public markId: string|number

	constructor (option: {
		level: TLevel,
		position?: string,
		timeFormat?: string,
		mark?: boolean
		markId?: string|number
	}) {
		this.level = option.level
		this.currentLevelIndex = this.levels.findIndex(item => item === option.level)
		this.mark = !!option.mark
		this.markId = option.markId || parseInt((Math.random() * 100000).toString())
		if (option.position) this.position = option.position
		if (option.timeFormat) this.timeFormat = option.timeFormat
	}

	private _log (level: string, log?: any[]): void {
		if (!this.doLevelCheck(level)) return
		console.log(this.buildPrefix(level), ...(log || []))
	}

	public doLevelCheck (level: string) {
		const logLevel = this.levels.findIndex(item => item === level)
		return logLevel >= this.currentLevelIndex
	}

	public buildPrefix (level: string): string {
		if (!this.doLevelCheck(level)) return ''
		const now = dayjs().format(this.timeFormat)
		let prefix = `[${level}] ${now}`
		if (this.position) prefix += ` [${this.position}]`
		if (this.mark) prefix += ` [${this.markId}]`
		return prefix
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
