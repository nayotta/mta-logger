import * as dayjs from 'dayjs'

export type TLevel = 'all'|'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'off'

export class Logger {
	private levels: TLevel[] = ['all', 'trace', 'debug', 'info', 'warn', 'error', 'fatal', 'off']
	private currentLevelIndex: number
	public level: string
	public position: string = ''
	public timeFormat: string = 'YYYY-MM-DDTHH:mm:ss:SSS'

	constructor (option: {
		level: TLevel,
		position?: string,
		timeFormat?: string
	}) {
		this.level = option.level
		this.currentLevelIndex = this.levels.findIndex(item => item === option.level)
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
		return this.position ? `[${level}] ${now} [${this.position}]` : `[${level}] ${now}`
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
