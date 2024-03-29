import { hot, setConfig } from 'react-hot-loader'
import { cssRaw, cssRule, media } from 'typestyle'
import { App } from '../@app/App'
import { fontStack, colorBackground, colorForeground, colorSelection } from '../@app/theme'
import reset from './reset.css'

setConfig({
	logLevel: 'debug',
	ignoreSFC: true, // RHL will be __completely__ disabled for SFC
	pureRender: true, // RHL will not change render method
})

cssRaw(reset)

cssRule('::selection', {
	background: colorSelection,
	color: '#000',
})

cssRule('html, body', {
	height: '100%',
	width: '100%',
})

cssRule(
	'body',
	{
		display: 'flex',
		fontFamily: fontStack,
		fontWeight: 400,
		fontSize: '11px',
		contain: 'strict',
		overflow: 'hidden',
		overscrollBehavior: 'none',
		color: colorForeground,
		backgroundColor: colorBackground,
	},
	media({ minWidth: 420 }, { fontSize: '14px' })
)

cssRule('#app', {
	flexGrow: 1,
	display: 'flex',
	flexDirection: 'column',
})

export const Landing = hot(module)(App)
