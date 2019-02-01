import nanoid from 'nanoid'
import { Observable, timer, throwError } from 'rxjs'
import { tap, retryWhen, mergeMap } from 'rxjs/operators'

export const debug = (...args: any[]) => <T>(stream: Observable<T>) => {
	if (process.env.NODE_ENV === 'production') {
		return stream
	} else {
		return stream.pipe(
			// tslint:disable-next-line:no-console
			tap(console.log.bind(console, ...args))
		)
	}
}

export const isShallowEqual = (a: any, b: any): boolean => {
	if (!a || !b) {
		return !a && !b
	}

	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	const aLen = aKeys.length
	const bLen = bKeys.length

	if (aLen === bLen) {
		for (let i = 0; i < aLen; ++i) {
			const key = aKeys[i]
			if (a[key] !== b[key]) {
				return false
			}
		}
		return true
	}

	return false
}

export const isArrayEqual = (a: any[], b: any[]) => {
	if (a === b) {
		return true
	}

	if (a.length === b.length) {
		for (let i = 0, l = a.length; i < l; ++i) {
			if (a[i] !== b[i]) {
				return false
			}
		}
		return true
	}

	return false
}

// 60 attempts its ~1h and 1m
export function retryStrategy<T>(maxAttempts = 60) {
	return retryWhen<T>((attempts) =>
		attempts.pipe(
			mergeMap((error, i) =>
				i < maxAttempts ? timer((i < 7 ? (i + 1) * 2 : 60) * 1000) : throwError(error)
			)
		)
	)
}

export const genID = () => nanoid(10)
