import * as dayjs from 'dayjs'

export type TLevel = 'all'|'info'|'debug'|'warn'|'error'|'off'

export class Logger {
	private levels: TLevel[] = ['all', 'info', 'debug', 'warn', 'error', 'off']
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
		console.log(this.buildPrefix(level), ...(log || []))
	}

	public buildPrefix (level: string): string {
		const logLevel = this.levels.findIndex(item => item === level)
		if (logLevel < this.currentLevelIndex) return ''
		const now = dayjs().format(this.timeFormat)
		return this.position ? `[${level}] ${now} [${this.position}]` : `[${level}] ${now}`
	}

	public info (...log: any[]) {
		this._log('info', log)
	}

	public debug (...log: any[]) {
		this._log('debug', log)
	}

	public warn (...log: any[]) {
		this._log('warn', log)
	}

	public error (...log: any[]) {
		this._log('error', log)
	}
}
