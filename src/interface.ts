import { TFieldValue, TFields, TLevel, TLogFValue } from './type'

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
	trace (...log: any[]): void
	debug (...log: any[]): void
	info (...log: any[]): void
	warn (...log: any[]): void
	error (...log: any[]): void
	fatal (...log: any[]): void
	tracef (tmpl: string, ...args: TLogFValue[]): void
	debugf (tmpl: string, ...args: TLogFValue[]): void
	infof (tmpl: string, ...args: TLogFValue[]): void
	warnf (tmpl: string, ...args: TLogFValue[]): void
	errorf (tmpl: string, ...args: TLogFValue[]): void
	fatalf (tmpl: string, ...args: TLogFValue[]): void
}
