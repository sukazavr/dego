import { types, style } from 'typestyle'

export const fontStack = "Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif"
export const fontMonoStack = "Monaco, Menlo, Consolas, 'Courier New', monospace"

export const colorForeground = '#C6C6C6'
export const colorBackground = '#242424'
export const colorFocus = '#307bdc'
export const colorBorder = 'rgba(0, 0, 0, 0.4)'
export const colorSelection = '#ffeb00'

export const $slot = style({
	display: 'flex',
	overflow: 'hidden',
	$nest: {
		'&>*': {
			flexGrow: 1,
		},
	},
})

export const $scroll = style({
	$nest: {
		'&::-webkit-scrollbar': {
			width: '.4em',
			height: '.4em',
		},
		'&::-webkit-scrollbar-corner': {
			backgroundColor: 'transparent',
		},
		'&::-webkit-scrollbar-track': {
			borderTop: `1px solid ${colorBorder}`,
			borderLeft: `1px solid ${colorBorder}`,
		},
		'&:hover::-webkit-scrollbar-thumb': {
			backgroundColor: '#000',
		},
	},
})

export const $tappable = style({
	cursor: 'pointer',
	userSelect: 'none',
})

type BoxUnit = number | string
const boxUnitToString = (value: BoxUnit): string => {
	if (typeof value === 'number') {
		return value.toString() + 'em'
	} else {
		return value
	}
}

export const gridSpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		marginTop: '-' + spacing,
		marginLeft: '-' + spacing,
		'&>*': {
			marginTop: spacing,
			marginLeft: spacing,
		},
	} as types.CSSProperties
}

export const verticallySpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		'&>*': {
			marginBottom: spacing + ' !important',
		},
		'&>*:last-child': {
			marginBottom: '0px !important',
		},
	} as types.CSSProperties
}

export const horizontallySpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		'&>*': {
			marginRight: spacing + ' !important',
		},
		'&>*:last-child': {
			marginRight: '0px !important',
		},
	} as types.CSSProperties
}
