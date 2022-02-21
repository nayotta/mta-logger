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

	private _log (level: string, position?: string, log?: any[]): void {
		const positionVal = position || this.position
		console.log(this.buildPrefix(level, positionVal), ...(log || []))
	}

	public buildPrefix (level: string, position?: string): string {
		const logLevel = this.levels.findIndex(item => item === level)
		if (logLevel < this.currentLevelIndex) return ''
		const now = dayjs().format(this.timeFormat)
		const positionVal = position || this.position
		return positionVal ? `[${level}] ${now} [${positionVal}]` : `[${level}] ${now}`
	}

	public info (position?: string, ...log: any[]) {
		this._log('info', position, log)
	}

	public debug (position?: string, ...log: any[]) {
		this._log('debug', position, log)
	}

	public warn (position?: string, ...log: any[]) {
		this._log('warn', position, log)
	}

	public error (position?: string, ...log: any[]) {
		this._log('error', position, log)
	}
}
