import { TFieldValue, TFields, TLevel } from './type'

export interface ILogger {
	// properties
	level: TLevel
	colorful: boolean
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
}
