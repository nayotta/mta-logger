import { ILogger, TAddLogFnHooks, TFields, TLevel, TLogFFn, TLogFValue, TLogFn, TLogFnHook, TLogFormatFn } from './interface'
import { formats } from './format'

export class Logger implements ILogger {
	protected levels: TLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'panic', 'off']
	protected currentLevelIndex: number
	protected format: TLogFormatFn = formats.default
	protected hooks: TLogFnHook[] = []

	public level: TLevel
	public colorful: boolean = true
	public logfMinCharLen: number = 32
	public fields: TFields = {}
	public err: Error | undefined

	constructor (option: {
		level: TLevel
		format?: TLogFormatFn
		fields?: TFields
		err?: Error
		colorful?: boolean
		logfMinCharLen?: number
		logHooks?: TLogFnHook[]
	}) {
		this.level = option.level
		this.currentLevelIndex = this.levels.findIndex(item => item === option.level)
		if (option.format !== undefined) this.format = option.format
		if (option.fields !== undefined) this.fields = option.fields
		if (option.err !== undefined) this.err = option.err
		if (option.colorful !== undefined) this.colorful = option.colorful
		if (option.logfMinCharLen !== undefined) this.logfMinCharLen = option.logfMinCharLen
		if (option.logHooks !== undefined) this.hooks = option.logHooks
	}

	protected _buildLogArgs (level: TLevel, log?: any[]): any[]|undefined {
		if (!this.doLevelCheck(level)) return
		const logItem = {
			level,
			time: new Date(),
			logs: log,
			colorful: this.colorful,
			error: this.err,
			fields: this.fields
		}
		this.hooks.forEach(hook => {
			if (hook.triggeredLevels.includes(level)) {
				hook.callback(logItem)
			}
		})
		const logs = this.format(logItem)
		return logs
	}

	protected _log (level: TLevel, log?: any[]): void {
		const logs = this._buildLogArgs(level, log)
		if (logs) console.log(...logs)
	}

	protected doLevelCheck (level: string) {
		const logLevel = this.levels.findIndex(item => item === level)
		return logLevel >= this.currentLevelIndex
	}

	public withLevel (level: TLevel): ILogger {
		return new Logger({
			level: level,
			format: this.format,
			logfMinCharLen: this.logfMinCharLen,
			colorful: this.colorful,
			fields: this.fields,
			err: this.err,
			logHooks: this.hooks
		})
	}

	public withColorful (colorful: boolean): ILogger {
		return new Logger({
			level: this.level,
			format: this.format,
			logfMinCharLen: this.logfMinCharLen,
			colorful: colorful,
			fields: this.fields,
			err: this.err,
			logHooks: this.hooks
		})
	}

	public withField (field: string, value: string|number|boolean): ILogger {
		return new Logger({
			level: this.level,
			format: this.format,
			logfMinCharLen: this.logfMinCharLen,
			colorful: this.colorful,
			fields: {
				...this.fields,
				[field]: value
			},
			err: this.err,
			logHooks: this.hooks
		})
	}

	public withFields (fields: TFields): ILogger {
		return new Logger({
			level: this.level,
			format: this.format,
			logfMinCharLen: this.logfMinCharLen,
			colorful: this.colorful,
			fields: {
				...this.fields,
				...fields
			},
			err: this.err,
			logHooks: this.hooks
		})
	}

	public withError (err: Error): ILogger {
		return new Logger({
			level: this.level,
			format: this.format,
			logfMinCharLen: this.logfMinCharLen,
			colorful: this.colorful,
			fields: this.fields,
			err: err,
			logHooks: this.hooks
		})
	}

	public trace: TLogFn = (...log) => {
		this._log('trace', log)
	}

	public debug: TLogFn = (...log) => {
		this._log('debug', log)
	}

	public info: TLogFn = (...log) => {
		this._log('info', log)
	}

	public warn: TLogFn = (...log) => {
		this._log('warn', log)
	}

	public error: TLogFn = (...log) => {
		this._log('error', log)
	}

	public fatal: TLogFn = (...log) => {
		this._log('fatal', log)
	}

	public panic: TLogFn = (...log) => {
		this._log('panic', log)
	}

	protected _logf (level: TLevel, tmpl: string, args?: TLogFValue[]): void {
		if (!this.doLevelCheck(level)) return
		const log = this._buildLogTmpl(tmpl, args)
		const logItem = {
			level,
			time: new Date(),
			logs: [log],
			colorful: this.colorful,
			error: this.err,
			fields: this.fields
		}
		this.hooks.forEach(hook => {
			if (hook.triggeredLevels.includes(level)) {
				hook.callback(logItem)
			}
		})
		const logs = this.format(logItem)
		console.log(...logs)
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

	public tracef: TLogFFn = (tmpl, ...args) => {
		this._logf('trace', tmpl, args)
	}

	public debugf: TLogFFn = (tmpl, ...args) => {
		this._logf('debug', tmpl, args)
	}

	public infof: TLogFFn = (tmpl, ...args) => {
		this._logf('info', tmpl, args)
	}

	public warnf: TLogFFn = (tmpl, ...args) => {
		this._logf('warn', tmpl, args)
	}

	public errorf: TLogFFn = (tmpl, ...args) => {
		this._logf('error', tmpl, args)
	}

	public fatalf: TLogFFn = (tmpl, ...args) => {
		this._logf('fatal', tmpl, args)
	}

	public panicf: TLogFFn = (tmpl, ...args) => {
		this._logf('panic', tmpl, args)
	}

	public addLogHooks: TAddLogFnHooks = (hooks) => {
		this.hooks = this.hooks.concat(hooks)
		return this
	}
}
