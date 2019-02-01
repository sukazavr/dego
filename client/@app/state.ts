import { Atom, Lens } from '@grammarly/focal'
import { defaultElement, IState, defaultLayout } from './types'

export const ROOT_ID = 'root'

export const appState$ = Atom.create<IState>({
	page: {
		elements: {
			[ROOT_ID]: {
				id: ROOT_ID,
				name: 'Root Container',
				children: [],
				asChild: {},
				asParent: {},
				isExpanded: true,
			},
		},
	},
	layout: defaultLayout,
})

// TODO: ???????
appState$.subscribe(console.log)

const page$ = appState$.lens('page')
export const elements$ = page$.lens('elements')

export const getElement$ = (id: string) =>
	elements$.lens(Lens.key(id)).lens(Lens.withDefault(defaultElement))

export const layout$ = appState$.lens('layout')

if (process.env.NODE_ENV !== 'production') {
	const LS_LAYOUT = '_!LAYOUT!_'

	const LSLayout = localStorage.getItem(LS_LAYOUT)
	const ParsedLayout = LSLayout && JSON.parse(LSLayout)

	if (ParsedLayout) {
		appState$.modify((state) => ({
			...state,
			layout: ParsedLayout ? ParsedLayout : state.layout,
		}))
	}

	layout$.subscribe((state) => {
		localStorage.setItem(LS_LAYOUT, JSON.stringify(state))
	})
}
