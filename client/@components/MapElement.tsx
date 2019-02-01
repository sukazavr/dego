import React from 'react'
import { Observable } from 'rxjs'
import { LiftWrapper } from '@grammarly/focal/dist/src/react'

export function bind$<T>(value: Observable<T>): JSX.Element
export function bind$<T>(
	value: Observable<T>,
	projection?: (value: T) => React.ReactNode,
	key?: string | number
): JSX.Element
export function bind$<T>(
	value: Observable<T>,
	projection?: (v: T) => React.ReactNode,
	key?: string | number
) {
	return (
		<LiftWrapper
			key={key}
			props={{ value }}
			component={(props) => (projection ? projection(props.value) : props.value) as any}
		/>
	)
}
