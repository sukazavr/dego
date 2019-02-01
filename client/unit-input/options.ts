import { isFloatString, isIntegerString, isString } from './utils'
import { IUnitOptions, EUnitType } from './types'

export const unitOptions: IUnitOptions = {
	default: {
		is: ({ t }) => t === EUnitType.Default,
		create: (unit) => ({ ...unit, t: EUnitType.Default }),
	},

	fr: isFloatString('fr'),
	em: isFloatString('em'),
	rem: isFloatString('rem'),
	vw: isFloatString('vw'),
	vh: isFloatString('vh'),
	'%': isFloatString('%'),

	px: isIntegerString('px'),

	auto: isString('auto'),
	inherit: isString('inherit'),
	'fit-content': isString('fit-content'),
	'min-content': isString('min-content'),
	'max-content': isString('max-content'),
}
