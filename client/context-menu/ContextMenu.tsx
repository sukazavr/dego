import React from 'react'
import { style, classes } from 'typestyle'

const PADDING = 20

type TPosition = { left: number; top: number }

type TMenuContainerProps = React.HTMLProps<HTMLDivElement> & {
	position: TPosition
}

type TMenuContainerState = {
	style: TPosition
}

export class MenuContainer extends React.Component<TMenuContainerProps, TMenuContainerState> {
	state = {
		style: {
			top: this.props.position.top,
			left: this.props.position.left,
		},
	}
	private ref = React.createRef<HTMLDivElement>()
	private updatePosition({ top, left }: TPosition) {
		const el = this.ref.current as HTMLDivElement
		const { width, height } = el.getBoundingClientRect()
		const pWidth = window.innerWidth - PADDING
		const pHeight = window.innerHeight - PADDING

		let nTop = Math.max(PADDING, top)
		nTop = nTop + height > pHeight ? pHeight - height : nTop

		let nLeft = Math.max(PADDING, left)
		nLeft = nLeft + width > pWidth ? pWidth - width : nLeft

		if (this.state.style.top !== nTop || this.state.style.left !== nLeft) {
			this.setState({
				style: {
					top: nTop,
					left: nLeft,
				},
			})
		}
	}
	componentDidUpdate(prevProps: TMenuContainerProps) {
		if (this.props.position !== prevProps.position) {
			this.updatePosition(this.props.position)
		}
	}
	componentDidMount() {
		this.updatePosition(this.props.position)
	}
	render() {
		const { children, position, ...props } = this.props
		return (
			<div {...props} ref={this.ref} className={$container} style={this.state.style}>
				{this.props.children}
			</div>
		)
	}
}

type TMenuItemProps = React.HTMLProps<HTMLDivElement> & {
	active?: boolean
}

export const MenuItem = ({ children, active, ...props }: TMenuItemProps) => (
	<div className={classes($item, active && $itemActive)} data-close-ctx {...props}>
		{children}
	</div>
)

export const MenuDivider = () => <div className={$divider} />

const $container = style({
	position: 'absolute',
	zIndex: 100,
	borderRadius: '0.4em',
	border: '1px solid #000',
	background: '#111317',
	padding: '0.2em',
	boxShadow: '0 1em 3em rgba(0,0,0,.8)',
})

const $item = style({
	color: '#e2e2e2',
	borderRadius: '0.2em',
	padding: '0.2em 0.4em',
	cursor: 'default',
	userSelect: 'none',
	$nest: {
		'&:hover': {
			color: '#fff',
			backgroundColor: '#0063ff',
		},
	},
})

const $itemActive = style({
	backgroundColor: 'rgba(0, 255, 90, 0.4)',
})

const $divider = style({
	borderBottom: '1px solid #2f2f2f',
	borderTop: '1px solid #000',
	margin: '0.4em 0',
})
