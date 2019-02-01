import { IUnit, EUnitType } from '../unit-input/types'

export interface IState {
	page: IPage
	layout: ILayout
}

export interface IPage {
	elements: TElements
}

export type TElements = { [id: string]: IElement }

export interface IElement {
	id: string
	name: string
	parent?: string
	children: string[]
	asChild: {}
	asParent: {}
	isExpanded: boolean
}

export const defaultElement: IElement = {
	id: 'string',
	name: 'string',
	children: [],
	asChild: {},
	asParent: {},
	isExpanded: true,
}

interface ILayout {
	treeWidth: number
	treeHeight: number
	childWidth: number
	canvasWidth: IUnit
	canvasHeight: IUnit
}

export const defaultLayout: ILayout = {
	treeWidth: 260,
	treeHeight: 400,
	childWidth: 310,
	canvasWidth: {
		t: EUnitType.FloatString,
		n: 800,
		s: 'px',
	},
	canvasHeight: {
		t: EUnitType.FloatString,
		n: 1000,
		s: 'px',
	},
}
