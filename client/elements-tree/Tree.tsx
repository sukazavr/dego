import React from 'react'
import { classes, style } from 'typestyle'
import { actionsTree } from '../@app/actions'
import { ROOT_ID } from '../@app/state'
import { $scroll } from '../@app/theme'
import { bind$ } from '../@components/MapElement'
import { MenuContainer, MenuItem } from '../context-menu/ContextMenu'
import { fabricCtxMenu } from '../context-menu/fabric'
import { Element } from './Element'
import { highlighter, PLACEHOLDER_HEIGHT } from './Highlighter'
import { makeDnDRoot } from './make-dnd'
import { setTreeEl, tree$ } from './state'
import { TDnDTreeProps } from './types'

export const Tree = makeDnDRoot(
	class extends React.PureComponent<TDnDTreeProps> {
		private ref = React.createRef<HTMLDivElement>()
		componentDidMount() {
			const el = this.ref.current as HTMLDivElement
			this.props.connectDropTarget(el)
			setTreeEl(el)
		}
		componentWillUnmount() {
			setTreeEl(null)
		}
		render() {
			return (
				<div
					ref={this.ref}
					className={classes($content, $scroll)}
					onContextMenu={ctxMenuElements.open({})}
				>
					{bind$(tree$, ([index, paths]) =>
						index.map((id) => <Element key={id} id={id} path={paths[id]} />)
					)}
					{highlighter}
				</div>
			)
		}
	}
)

const $content = style({
	flexGrow: 1,
	position: 'relative',
	overflow: 'hidden auto',
	paddingBottom: PLACEHOLDER_HEIGHT,
})

const ctxMenuElements = fabricCtxMenu(({ position }) => (
	<MenuContainer position={position}>
		<MenuItem
			children="Create Element"
			onClick={actionsTree.addInside._({ parentID: ROOT_ID })}
		/>
	</MenuContainer>
))
