import { Atom } from '@grammarly/focal'
import React from 'react'
import { concat, fromEvent, merge, NEVER, of, Subscription } from 'rxjs'
import { filter, map, share, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { classes, style } from 'typestyle'
import { ca } from '../@app/supply/action-helpers'
import { MenuContainer, MenuItem } from '../context-menu/ContextMenu'
import { fabricCtxMenu } from '../context-menu/fabric'
import { unitOptions } from './options'
import { defaultUnit, IUnit, TUnitOptionsKeys } from './types'
import { canIncrement, getMultiplier, stringToUnit, unitToString } from './utils'

const wheel$ = fromEvent<WheelEvent>(window, 'wheel').pipe(share())

type TProps = {
	unit$: Atom<IUnit>
	options: TUnitOptionsKeys[]
}

type TState = { value: IUnit; invalid: boolean }

export class Input extends React.PureComponent<TProps, TState> {
	state = {
		value: defaultUnit,
		invalid: false,
	}
	private focus = ca<React.FocusEvent<HTMLInputElement>>()
	private blur = ca<React.FocusEvent<HTMLInputElement>>()
	private mouseEnter = ca<React.MouseEvent<HTMLInputElement, MouseEvent>>()
	private mouseLeave = ca<React.MouseEvent<HTMLInputElement, MouseEvent>>()
	private keyDown = ca<React.KeyboardEvent<HTMLInputElement>>()
	private subs!: Subscription[]
	private ref = React.createRef<HTMLInputElement>()
	private isValid = (value: IUnit) => this.props.options.some((key) => unitOptions[key].is(value))
	private change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = stringToUnit(e.target.value)
		const valid = this.isValid(value)
		if (valid) {
			this.props.unit$.set(value)
		}
		this.setState({ value, invalid: !valid })
	}
	componentDidMount() {
		const unit$ = this.props.unit$
		const canIncrement$ = unit$.view(canIncrement)
		const el = this.ref.current as HTMLInputElement
		el.setAttribute('spellcheck', 'false')
		this.subs = [
			this.keyDown.$.subscribe((e) => {
				if (e.altKey) {
					e.preventDefault() // Prevent focus out
				}
			}),

			// Select all on focus
			this.focus.$.subscribe(() => {
				el.select()
			}),

			// Increment by keyboard arrows and mouse wheel
			canIncrement$
				.pipe(
					switchMap((canIncrement) =>
						canIncrement
							? merge(
									// mouse wheel
									this.focus.$.pipe(
										switchMap(() =>
											concat(of(0), this.mouseEnter.$).pipe(
												switchMap(() =>
													wheel$.pipe(
														tap((e) => {
															if (e.ctrlKey) {
																e.preventDefault() // // Prevent zoom-in/out
															}
														}),
														takeUntil(this.mouseLeave.$)
													)
												),
												takeUntil(this.blur.$)
											)
										),
										withLatestFrom(unit$),
										map(([e, unit]) => (e.deltaY < 0 ? 1 : -1) * getMultiplier(unit, e))
									),
									// keyboard arrows
									this.keyDown.$.pipe(
										filter(({ keyCode: c }) => c === 38 || c === 40),
										withLatestFrom(unit$),
										map(
											([e, unit]) => (e.keyCode === 38 ? 1 : -1) * getMultiplier(unit, e)
										)
									)
							  )
							: NEVER
					)
				)
				.subscribe((inc) => {
					unit$.modify((unit) => {
						const n = parseFloat((unit.n + inc).toFixed(2))
						return { ...unit, n }
					})
					requestAnimationFrame(() => {
						el.select()
					})
				}),

			// Follow the source
			unit$.subscribe((unit) => {
				this.setState((state) => {
					if (state.value === unit) {
						return state
					} else {
						return { value: unit, invalid: !this.isValid(unit) }
					}
				})
			}),
		]
	}
	componentWillUnmount() {
		this.subs.forEach((sub) => sub.unsubscribe())
	}
	render() {
		const { options, unit$ } = this.props
		const wDef = options.includes('default')
		return (
			<div className={$container}>
				<input
					type="text"
					placeholder={wDef ? 'default' : 'undefined'}
					ref={this.ref}
					className={classes($input, this.state.invalid && $invalid)}
					value={unitToString(this.state.value)}
					onChange={this.change}
					onFocus={this.focus}
					onBlur={this.blur}
					onMouseEnter={this.mouseEnter}
					onMouseLeave={this.mouseLeave}
					onKeyDown={this.keyDown}
				/>
				{options.length > 1 && (
					<div className={$menuBtn} onClick={ctxMenu.open({ options, unit$ })}>
						<svg
							width="3"
							height="13"
							viewBox="0 0 3 13"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="3" height="3" />
							<rect y="5" width="3" height="3" />
							<rect y="10" width="3" height="3" />
						</svg>
					</div>
				)}
			</div>
		)
	}
}

const $container = style({
	display: 'flex',
	width: 86,
	height: 24,
})

const $input = style({
	flex: '1 1 0',
	fontSize: '0.9em',
	width: 0,
	border: '1px solid rgba(255, 255, 255, 0.3)',
	lineHeight: 1.4,
	backgroundColor: 'transparent',
	color: '#9e9e9e',
	outline: 'none',
	padding: '0 0.4em',
	$nest: {
		'&:focus': {
			color: '#fff',
			borderColor: 'rgb(64, 138, 234)',
		},
		'&::placeholder': {
			color: '#9e9e9e',
		},
	},
})

const $invalid = style({
	backgroundColor: 'rgba(255, 35, 0, 0.2)',
})

const $menuBtn = style({
	width: '11px',
	backgroundColor: '#7e7e7e',
	color: 'rgba(255, 255, 255, 0.3)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
})

const ctxMenu = fabricCtxMenu<{ options: TUnitOptionsKeys[]; unit$: Atom<IUnit> }>(
	({ position, payload: { options, unit$ } }) => (
		<MenuContainer position={position}>
			{options.map((option) => {
				const { is, create } = unitOptions[option]
				const unit = unit$.get()
				return (
					<MenuItem
						key={option}
						children={option}
						active={is(unit)}
						onClick={() => unit$.set(create(unit))}
					/>
				)
			})}
		</MenuContainer>
	)
)
