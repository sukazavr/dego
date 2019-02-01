import { Atom, F } from '@grammarly/focal'
import React from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import { classes, style } from 'typestyle'
import { layout$ } from '../@app/state'
import { $scroll, colorBorder } from '../@app/theme'
import { Input } from '../unit-input/Input'
import { unitToString } from '../unit-input/utils'

const move$ = fromEvent<MouseEvent>(document, 'mousemove')
const up$ = fromEvent<MouseEvent>(document, 'mouseup')

const canvasWidth$ = layout$.lens('canvasWidth')
const canvasHeight$ = layout$.lens('canvasHeight')
const canvasStyle$ = Atom.combine(canvasWidth$, canvasHeight$, (w, h) => ({
	width: unitToString(w),
	height: unitToString(h),
}))

export class Preview extends React.PureComponent {
	private sub!: Subscription
	private ref = React.createRef<HTMLDivElement>()
	componentDidMount() {
		const el = this.ref.current as HTMLDivElement
		this.sub = fromEvent<MouseEvent>(el, 'mousedown')
			.pipe(
				switchMap((downE) => {
					const maxX = el.scrollWidth
					const maxY = el.scrollHeight
					const initialLeft = el.scrollLeft
					const initialTop = el.scrollTop
					const initialX = downE.pageX
					const initialY = downE.pageY
					return move$.pipe(
						map((moveE) => {
							moveE.preventDefault()
							const nextX = initialLeft + initialX - moveE.pageX
							const nextY = initialTop + initialY - moveE.pageY
							return [
								nextX < 0 ? 0 : nextX > maxX ? maxX : nextX,
								nextY < 0 ? 0 : nextY > maxY ? maxY : nextY,
							]
						}),
						takeUntil(up$)
					)
				})
			)
			.subscribe(([scrollLeft, scrollTop]) => {
				el.scrollLeft = scrollLeft
				el.scrollTop = scrollTop
			})
	}
	componentWillUnmount() {
		this.sub.unsubscribe()
	}
	render() {
		return (
			<div className={$container}>
				<div className={$header}>
					<div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
						<Input unit$={canvasWidth$} options={['px']} />
						<div style={{ padding: '0 .5em' }}>✕</div>
						<Input unit$={canvasHeight$} options={['px']} />
					</div>
				</div>
				<div ref={this.ref} className={$preview}>
					<div className={$center}>
						<F.div className={$canvas} style={canvasStyle$} />
					</div>
				</div>
			</div>
		)
	}
}

const $container = style({
	display: 'flex',
	flexDirection: 'column',
})

const $header = style({
	flexShrink: 0,
	display: 'flex',
	padding: '0.4em 0.6em',
	borderBottom: `1px solid ${colorBorder}`,
	backgroundColor: 'rgba(255, 255, 255, 0.1)',
})

const $preview = classes(
	$scroll,
	style({
		display: 'flex',
		flexGrow: 1,
		overflow: 'scroll',
		$nest: {
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: '#000',
			},
		},
	})
)

const $center = style({
	flexGrow: 1,
	display: 'grid',
	placeItems: 'center center',
})

const $canvas = style({
	margin: '2em',
	boxShadow: '0 0 0.8em 0.2em rgba(0, 0, 0, 0.4)',
	backgroundColor: '#505050',
	backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 2V0h1v1H0v1z" fill-opacity=".025"/></svg>')`,
	backgroundSize: '20px 20px',
})
