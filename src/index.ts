import * as dayjs from 'dayjs'

export type TLevel = 'all'|'info'|'debug'|'warn'|'error'|'off'

export default class Logger {
	private levels: TLevel[] = ['all', 'info', 'debug', 'warn', 'error', 'off']
	private currentLevelIndex: number
	public level: string
	public timeFormat: string = 'YYYY-MM-DDTHH:mm:ss:SSS'

	constructor (option: {
		level: TLevel,
		timeFormat?: string
	}) {
		this.level = option.level
		this.currentLevelIndex = this.levels.findIndex(item => item === option.level)
		if (option.timeFormat) this.timeFormat = option.timeFormat
	}

	private _log (level: string, position: string, log: any[]) {
		console.log(this.buildPrefix(level, position), ...log)
	}

	public buildPrefix (level: string, position: string) {
		const logLevel = this.levels.findIndex(item => item === level)
		if (logLevel < this.currentLevelIndex) return
		const now = dayjs().format(this.timeFormat)
		return `[${level}] ${now} [${position}]`
	}

	public info (position: string, ...log: any[]) {
		this._log('info', position, log)
	}

	public debug (position: string, ...log: any[]) {
		this._log('debug', position, log)
	}

	public warn (position: string, ...log: any[]) {
		this._log('warn', position, log)
	}

	public error (position: string, ...log: any[]) {
		this._log('error', position, log)
	}
}
