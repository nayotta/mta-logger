/* eslint-disable no-use-before-define */
export type TLevel = 'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'panic'|'off'

export type TFieldValue = string|number|boolean

export type TLogItem = {
	level: TLevel
	time: Date
	logs?: any[]
	colorful: boolean
	error?: Error
	fields: {
		[field: string]: TFieldValue
	}
}

export type TTimeFormatFn = (time: Date) => string

export type TLogFormatFn = (logItem: TLogItem) => any[]

export type TFields = {
	[field: string]: TFieldValue
}

export type TLogFValue = string|number|boolean

export type TLogFn = (...log: any[]) => void

export type TLogFFn = (tmpl: string, ...args: TLogFValue[]) => void

export type TLogFnHook = {
	levels: TLevel[]
	callback: (logItem: TLogItem) => void
}

export type TAddLogFnHooks = (hooks: TLogFnHook[]) => ILogger

export interface ILogger {
	// properties
	level: TLevel
	colorful: boolean
	logfMinCharLen: number
	fields: TFields
	err: Error|undefined

	// methods
	withLevel (level: TLevel): ILogger
	withColorful (colorful: boolean): ILogger
	withField (field: string, value: TFieldValue): ILogger
	withFields (fields: TFields): ILogger
	withError (err: Error): ILogger
	trace: TLogFn
	debug: TLogFn
	info: TLogFn
	warn: TLogFn
	error: TLogFn
	fatal: TLogFn
	panic: TLogFn
	tracef: TLogFFn
	debugf: TLogFFn
	infof: TLogFFn
	warnf: TLogFFn
	errorf: TLogFFn
	fatalf: TLogFFn
	panicf: TLogFFn

	// hooks
	addLogHooks: TAddLogFnHooks
}
