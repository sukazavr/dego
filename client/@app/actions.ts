import { ca, ga, generalActionsLog$ } from './supply/action-helpers'

if (process.env.NODE_ENV !== 'production') {
	generalActionsLog$.subscribe(({ key, namespace, payload }) => {
		// tslint:disable:no-console
		console.group('🔷', key, '🔹', namespace)
		console.log(payload)
		console.groupEnd()
	})
}

export const actionsApp = ga('app', {
	changeLayout: ca(),
})

export const actionsTree = ga('elements-tree', {
	addInside: ca<{ parentID: string }>(),
	addAbove: ca<{ neighborID: string }>(),
	addBelow: ca<{ neighborID: string }>(),
	delete: ca<{ id: string }>(),
	focus: ca<{ id: string }>(),
	editName: ca<{ id: string }>(),
})
