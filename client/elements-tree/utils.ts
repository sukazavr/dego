import { IElement, defaultElement } from '../@app/types'
import { genID } from '../@app/supply/utils'

let index = 0

export const createTreeElement = (): IElement => ({
	...defaultElement,
	id: genID(),
	name: `_${++index}`,
})
