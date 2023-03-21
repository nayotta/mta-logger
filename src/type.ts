export type TLevel = 'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'off'

export type TTimeFormatFn = (time: Date) => string

export type TFieldValue = string|number|boolean

export type TFields = {
	[field: string]: TFieldValue
}

export type TLogFValue = string|number|boolean
