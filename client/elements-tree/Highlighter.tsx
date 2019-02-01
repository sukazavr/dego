import React from 'react'
import { style } from 'typestyle'
import { colorSelection } from '../@app/theme'
import { bind$ } from '../@components/MapElement'
import { dndState$ } from './state'

export const PLACEHOLDER_HEIGHT = 4

const $placeholder = style({
	height: PLACEHOLDER_HEIGHT,
	background: colorSelection,
	position: 'absolute',
	pointerEvents: 'none',
	transitionDuration: '60ms',
	transitionProperty: 'top',
})

export const highlighter = bind$(dndState$, (dndState) => {
	if (dndState.canDrop) {
		return (
			<div
				className={$placeholder}
				style={{
					...dndState.placeholderStyle,
					top: dndState.placeholderStyle.top - PLACEHOLDER_HEIGHT / 2,
				}}
			/>
		)
	}
	return null
})
