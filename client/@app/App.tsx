import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { classes, style } from 'typestyle'
import { ctxMenuSlot } from '../context-menu/fabric'
import { Layout } from '../layout/Layout'
import { $slot } from './theme'

export const App = DragDropContext(HTML5Backend)(() => {
	return (
		<div className={$container}>
			<div className={$sidebar} />
			<div className={$content}>
				<Layout />
			</div>
			{ctxMenuSlot}
		</div>
	)
})

const $container = style({
	flexGrow: 1,
	display: 'flex',
	overflow: 'hidden',
})

const $sidebar = style({
	flexShrink: 0,
	width: '3.6em',
})

const $content = classes(
	$slot,
	style({
		flexGrow: 1,
	})
)
