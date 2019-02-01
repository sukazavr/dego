export enum EUnitType {
	Default,
	String,
	Number,
	FloatString,
	IntegerString,
}

export interface IUnit {
	t: EUnitType
	n: number
	s: string
}

export const defaultUnit: IUnit = {
	t: EUnitType.Default,
	n: 0,
	s: '',
}

export interface IUnitOption {
	is: (unit: IUnit) => boolean
	create: (unit: IUnit) => IUnit
}

export interface IUnitOptions {
	default: IUnitOption

	fr: IUnitOption
	em: IUnitOption
	rem: IUnitOption
	vw: IUnitOption
	vh: IUnitOption
	'%': IUnitOption

	px: IUnitOption

	auto: IUnitOption
	inherit: IUnitOption
	'fit-content': IUnitOption
	'min-content': IUnitOption
	'max-content': IUnitOption
}

export type TUnitOptionsKeys = keyof IUnitOptions
