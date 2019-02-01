import React from 'react'
import { style } from 'typestyle'
import { colorBorder } from '../@app/theme'
import './epic'
import { CursorCapture } from './make-dnd'
import { Tree } from './Tree'

export const ElementsTree = () => {
	return (
		<div className={$container}>
			<div className={$header}>Elements</div>
			<Tree />
			<CursorCapture />
		</div>
	)
}

const $container = style({
	display: 'flex',
	flexDirection: 'column',
})

const $header = style({
	flexShrink: 0,
	padding: '0.4em 0.6em',
	borderBottom: `1px solid ${colorBorder}`,
	backgroundColor: 'rgba(255, 255, 255, 0.1)',
})
