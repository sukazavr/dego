import { layout$ } from '../@app/state'

export const treeWidth$ = layout$.lens('treeWidth')
export const treeHeight$ = layout$.lens('treeHeight')
export const childWidth$ = layout$.lens('childWidth')
