import { F } from '@grammarly/focal'
import React from 'react'
import { style } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { layout$ } from '../@app/state'
import { ElementsTree } from '../elements-tree/ElementsTree'
import { Preview } from '../preview/Preview'
import { Divider } from './Divider'
import { childWidth$, treeHeight$, treeWidth$ } from './state'

const TREE_AREA = '1 / 1 / 2 / 2'
const CHILD_AREA = '1 / 2 / 2 / 3'
const PARENT_AREA = '2 / 1 / 3 / 3'
const PREVIEW_AREA = '1 / 3 / 3 / 4'

export class Layout extends React.PureComponent {
	private ref = React.createRef<HTMLDivElement>()
	private style$ = layout$.view(({ childWidth, treeWidth, treeHeight }) => ({
		gridTemplateColumns: `${treeWidth}px ${childWidth}px minmax(0, 1fr)`,
		gridTemplateRows: `${treeHeight}px minmax(0, 1fr)`,
	}))
	render() {
		return (
			<F.div mount={this.ref} className={$container} style={this.style$}>
				<div className={$tree}>
					<ElementsTree />
				</div>
				<div className={$child}>d</div>
				<div className={$parent}>d</div>
				<div className={$preview}>
					<Preview />
				</div>
				<Divider ward={treeWidth$} area={CHILD_AREA} />
				<Divider ward={treeHeight$} area={PARENT_AREA} row />
				<Divider ward={childWidth$} area={PREVIEW_AREA} />
			</F.div>
		)
	}
}

const $container = style({
	display: 'grid',
})

const common: NestedCSSProperties = {
	display: 'flex',
	$nest: {
		'&>*': {
			flexGrow: 1,
			minWidth: 0,
		},
	},
}

const $tree = style(common, {
	gridArea: TREE_AREA,
	backgroundColor: 'rgba(255, 255, 255, 0.12)',
})

const $child = style(common, {
	gridArea: CHILD_AREA,
	backgroundColor: 'rgba(255, 255, 255, 0.12)',
})

const $parent = style(common, {
	gridArea: PARENT_AREA,
	backgroundColor: 'rgba(255, 255, 255, 0.12)',
})

const $preview = style(common, {
	gridArea: PREVIEW_AREA,
	backgroundColor: 'rgba(255, 255, 255, 0.06)',
})
