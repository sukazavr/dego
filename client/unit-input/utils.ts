import { defaultUnit, EUnitType, IUnit, IUnitOption } from './types'

export const stringToUnit = (_: string) => {
	const string = _.trim()
	const unit: IUnit = { ...defaultUnit }
	if (string === '') {
		return unit
	}
	const number = parseFloat(string)
	if (isNaN(number)) {
		unit.t = EUnitType.String
		unit.s = string
		return unit
	}
	const numberString = number.toString()
	if (numberString === string) {
		unit.t = EUnitType.Number
		unit.n = number
		return unit
	}
	unit.t = number % 1 === 0 ? EUnitType.IntegerString : EUnitType.FloatString
	unit.n = number
	unit.s = string.replace(numberString, '').toLowerCase()
	return unit
}

export const unitToString = ({ t: type, n: number, s: string }: IUnit) => {
	switch (type) {
		case EUnitType.Number:
			return number
		case EUnitType.String:
			return string
		case EUnitType.FloatString:
		case EUnitType.IntegerString:
			return number + string
		default:
			return ''
	}
}

export const canIncrement = ({ t }: IUnit) => t !== EUnitType.Default && t !== EUnitType.String

export const getMultiplier = (
	{ t }: IUnit,
	e: { ctrlKey: boolean; shiftKey: boolean; altKey: boolean }
) => {
	switch (true) {
		case e.ctrlKey:
			return 100
		case e.shiftKey:
			return 10
		case e.altKey && t === EUnitType.FloatString:
			return 0.1
		default:
			return 1
	}
}

export const isIntegerString = (s: string): IUnitOption => ({
	is: (unit) => unit.t === EUnitType.IntegerString && unit.s === s,
	create: (unit) => ({ ...unit, t: EUnitType.IntegerString, s, n: Math.round(unit.n) }),
})

export const isFloatString = (s: string): IUnitOption => ({
	is: (unit) =>
		(unit.t === EUnitType.FloatString || unit.t === EUnitType.IntegerString) && unit.s === s,
	create: (unit) => ({ ...unit, t: EUnitType.FloatString, s }),
})

export const isString = (s: string): IUnitOption => ({
	is: (unit) => unit.t === EUnitType.String && unit.s === s,
	create: (unit) => ({ ...unit, t: EUnitType.String, s }),
})
