import React from 'react'
import { Portal } from 'react-portal'
import { concat, fromEvent, merge, of } from 'rxjs'
import { filter, map, share, startWith, switchMap, take } from 'rxjs/operators'
import { ca, TDummyAction } from '../@app/supply/action-helpers'
import { bind$ } from '../@components/MapElement'

type TMenuMaker<T> = (
	props: {
		close: TDummyAction
		position: { top: number; left: number }
		payload: T
	}
) => React.ReactNode

export function fabricCtxMenu<T>(menuMaker: TMenuMaker<T>) {
	const open = ca<
		T,
		{ position: { left: number; top: number }; payload: T },
		(e: React.MouseEvent<any, MouseEvent>) => void
	>((R, payload) => (e) => {
		e.preventDefault()
		e.stopPropagation()
		R({ position: { left: e.pageX, top: e.pageY }, payload })
	})
	const close = ca()
	let node: React.ReactNode | undefined
	close.$.subscribe(() => {
		if (node) {
			hide(node)
			node = undefined
		}
	})
	open.$.pipe(
		switchMap((props) => {
			node = menuMaker({ close, ...props })
			show(node)
			return merge(
				show.$.pipe(filter((n) => n !== node)),
				escPressed$,
				clickOutside$.pipe(
					filter((e) => {
						const target = e.target as Element
						if (cmNode.contains(target)) {
							return target.hasAttribute('data-close-ctx')
						} else {
							return e.button === 0
						}
					})
				)
			).pipe(take(1))
		})
	).subscribe(close)
	return {
		open,
		close,
	}
}

const cmNode = document.createElement('div')
document.body.appendChild(cmNode)

const show = ca<React.ReactNode>()
const hide = ca<React.ReactNode>()
const clickOutside$ = fromEvent<MouseEvent>(document, 'click').pipe(share())
const escPressed$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
	filter((e) => e.keyCode === 27),
	share()
)

export const ctxMenuSlot = bind$(
	show.$.pipe(
		switchMap((node) =>
			concat(
				of(<Portal node={cmNode}>{node}</Portal>),
				hide.$.pipe(
					filter((n) => n === node),
					map(() => null)
				)
			)
		),
		startWith(null)
	)
)
