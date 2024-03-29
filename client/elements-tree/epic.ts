import { produce } from 'immer'
import { merge } from 'rxjs'
import { actionsTree } from '../@app/actions'
import { elements$ } from '../@app/state'
import { IElement, TElements } from '../@app/types'
import { flashElement } from './Element'
import { elStore, dndEndDragging, dndState$ } from './state'
import { createTreeElement } from './utils'
import { withLatestFrom } from 'rxjs/operators'

actionsTree.focus.$.subscribe(({ id }) => {
	const el = elStore.get(id)
	if (el) {
		const treeEl = el.parentElement as HTMLElement
		const parentScrollTop = treeEl.scrollTop
		const offsetDiff = el.offsetTop
		const overTop = offsetDiff < parentScrollTop
		const overBottom = offsetDiff + el.clientHeight > parentScrollTop + treeEl.clientHeight
		if (overTop || overBottom) {
			el.scrollIntoView()
		}
	}
})

merge<[string, boolean]>(
	actionsTree.addAbove.$.map(({ neighborID }) => [neighborID, false]),
	actionsTree.addBelow.$.map(({ neighborID }) => [neighborID, true])
).subscribe(([neighborID, after]) => {
	const element = createTreeElement()
	elements$.modify((elements) =>
		produce(elements, (draft) => {
			mutateAddNeighbor(draft, element, neighborID, after)
		})
	)
	flashElement(element.id)
})

actionsTree.addInside.$.subscribe(({ parentID }) => {
	const element = createTreeElement()
	elements$.modify((elements) =>
		produce(elements, (draft) => {
			mutateAddInside(draft, element, parentID)
		})
	)
	flashElement(element.id)
})

actionsTree.delete.$.subscribe(({ id }) => {
	elements$.modify((elements) =>
		produce(elements, (draft) => {
			const element = draft[id]
			if (element) {
				mutateRemoveFromParent(draft, element)
				mutateRemoveFromTree(draft, element)
			}
		})
	)
})

dndEndDragging.$.pipe(withLatestFrom(dndState$)).subscribe(
	([, { sourceID, targetID, addAbove, addBelow, addInside }]) => {
		if (targetID) {
			elements$.modify((elements) =>
				produce(elements, (draft) => {
					const element = draft[sourceID]
					if (element) {
						mutateRemoveFromParent(draft, element)
						if (addAbove) {
							mutateAddNeighbor(draft, element, targetID, false)
						} else if (addBelow) {
							mutateAddNeighbor(draft, element, targetID, true)
						} else if (addInside) {
							mutateAddInside(draft, element, targetID)
						} else {
							mutateRemoveFromTree(draft, element)
						}
					}
				})
			)
		}
	}
)

const mutateAddNeighbor = (
	draft: TElements,
	element: IElement,
	neighborID: string,
	below: boolean
) => {
	const parentID = draft[neighborID].parent
	if (parentID) {
		const parent = draft[parentID]
		if (parent) {
			element.parent = parentID
			const id = element.id
			const neighborIndex = parent.children.indexOf(neighborID)
			parent.children.splice(neighborIndex + Number(below), 0, id)
			draft[id] = element
		}
	}
}

const mutateAddInside = (draft: TElements, element: IElement, parentID: string) => {
	const parent = draft[parentID]
	if (parent) {
		element.parent = parentID
		const id = element.id
		parent.children.push(id)
		parent.isExpanded = true
		draft[id] = element
	}
}

const mutateRemoveFromParent = (draft: TElements, element: IElement) => {
	if (element.parent) {
		const children = draft[element.parent].children
		const index = children.indexOf(element.id)
		if (index > -1) {
			children.splice(index, 1)
		}
	}
}

const mutateRemoveFromTree = (draft: TElements, element: IElement) => {
	element.children.forEach((childID) => {
		const child = draft[childID]
		if (child) {
			mutateRemoveFromTree(draft, child)
		}
	})
	delete draft[element.id]
}
