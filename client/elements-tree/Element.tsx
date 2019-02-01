import { F } from '@grammarly/focal'
import React from 'react'
import { combineLatest, merge, of } from 'rxjs'
import { delay, map, shareReplay, startWith, switchMap } from 'rxjs/operators'
import { classes, keyframes, style } from 'typestyle'
import { actionsTree } from '../@app/actions'
import { getElement$ } from '../@app/state'
import { ca } from '../@app/supply/action-helpers'
import { colorFocus, colorSelection } from '../@app/theme'
import { IElement } from '../@app/types'
import { MenuContainer, MenuDivider, MenuItem } from '../context-menu/ContextMenu'
import { fabricCtxMenu } from '../context-menu/fabric'
import { Expander } from './Expander'
import { makeDnDElement } from './make-dnd'
import { Name } from './Name'
import {
	draggingID$,
	elStore,
	focusedID$,
	hoveredID$,
	hoverElement,
	placeholderParentID$,
} from './state'
import { TDnDElementProps } from './types'

export const Element = makeDnDElement(
	class extends React.PureComponent<TDnDElementProps> {
		private ref = React.createRef<HTMLDivElement>()
		private commonClassName$ = combineLatest(...classMatch.ids).map((stateIDs) => {
			const id = this.props.id
			return stateIDs
				.map((stateID, index) => stateID === id && classMatch.names[index])
				.filter(Boolean)
				.join(' ')
		})
		private className$ = draggingID$.pipe(
			switchMap((draggingID) => {
				const { id, path } = this.props
				if (draggingID) {
					return placeholderParentID$.map((pID) =>
						classes(pID === id ? $targeted : path.includes(draggingID) && $dragging)
					)
				} else {
					return this.commonClassName$
				}
			}),
			map((_) => classes($container, _))
		)
		componentDidMount() {
			const el = this.ref.current as HTMLDivElement
			elStore.set(this.props.id, el)
			this.props.connectDragSource(el)
			this.props.connectDropTarget(el)
			//this.props.connectDragEmptyPreview()
		}
		componentWillUnmount() {
			elStore.delete(this.props.id)
		}
		render() {
			const { id, path } = this.props
			const element$ = getElement$(id)
			return (
				<F.div
					mount={this.ref}
					className={this.className$}
					style={{ paddingLeft: `${(path.length - 1) * 0.8}em` }}
					onMouseEnter={hoverElement._(id)}
					onMouseLeave={releaseHover}
					onClick={actionsTree.focus._({ id })}
					onContextMenu={element$.map((element) => ctxMenuElement.open(element))}
				>
					<Expander element$={element$} />
					<Name id={id} name$={element$.lens('name')} />
				</F.div>
			)
		}
	}
)

const $container = style({
	display: 'flex',
	alignItems: 'center',
	whiteSpace: 'nowrap',
	userSelect: 'none',
	cursor: 'default',
	$nest: {
		'&>*': {
			flexShrink: 0,
		},
	},
})

const $focused = style({
	color: '#fff',
	backgroundColor: colorFocus,
})

const $hovered = style({
	boxShadow: `inset 0 0 0 1px ${colorFocus}`,
})

const $pointed = style({
	boxShadow: `inset 0 0 0 2px ${colorSelection}`,
})

const $targeted = style({
	boxShadow: `inset 0 0 0 1px ${colorSelection}`,
})

const FLASH_DURATION = 600
const $flashed = style({
	animationName: keyframes({
		'0%': { opacity: 0, transform: 'rotateX(90deg) scale3d(1.2, 1.2, 1.2)' },
		'50%': {
			opacity: 1,
			animationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
			transform: 'rotateX(-20deg) scale3d(1, 1, 1)',
		},
		'100%': {
			transform: 'rotateX(0deg) scale3d(1, 1, 1)',
		},
	}),
	animationDuration: `${FLASH_DURATION}ms`,
})

const $dragging = style({
	backgroundColor: 'rgba(102, 170, 255, 0.17)',
})

const ctxMenuElement = fabricCtxMenu<IElement>(({ position, payload: { id, parent } }) => {
	const isRoot = !parent
	return (
		<MenuContainer position={position}>
			<MenuItem
				children="Add Element Inside"
				onClick={actionsTree.addInside._({ parentID: id })}
			/>
			{!isRoot && (
				<>
					<MenuItem
						children="Add Element Above"
						onClick={actionsTree.addAbove._({ neighborID: id })}
					/>
					<MenuItem
						children="Add Element Below"
						onClick={actionsTree.addBelow._({ neighborID: id })}
					/>
					<MenuDivider />
					<MenuItem children="Delete" onClick={actionsTree.delete._({ id })} />
				</>
			)}
		</MenuContainer>
	)
})

const pointedID$ = merge(
	ctxMenuElement.open.$.map(({ payload: { id } }) => id),
	ctxMenuElement.close.$.map(() => null)
).pipe(
	startWith<string | null>(null),
	shareReplay(1)
)

export const flashElement = ca<string>()
const flashedID$ = flashElement.$.pipe(
	switchMap((id) => merge(of(id), of(null).pipe(delay(FLASH_DURATION + 100)))),
	startWith<string | null>(null),
	shareReplay(1)
)
flashElement.$.pipe(delay(100)).subscribe((id) => actionsTree.focus({ id }))

const releaseHover = hoverElement._(null)

const classMatch = {
	ids: [hoveredID$, focusedID$, flashedID$, pointedID$],
	names: [$hovered, $focused, $flashed, $pointed],
}
