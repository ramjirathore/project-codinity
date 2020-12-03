import { createMuiTheme } from '@material-ui/core/styles';

const codinityGrey = '#333333';
const codinityBlack = '#212121';
const codinityWhite = '#FFFFFF';

export default createMuiTheme({
	palette: {
		common: {
			black: codinityBlack,
			grey: codinityGrey,
			white: codinityWhite,
		},
		primary: {
			main: codinityBlack,
		},
		secondary: {
			main: codinityGrey,
		},
	},
	typography: {
		fontFamily: [
			'Raleway',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		tab: {
			fontFamily: 'Roboto',
			fontWeight: 600,
			fontSize: '1.2rem',
			textTransform: 'none',
		},

		// h2: {
		// 	fontFamily: 'Raleway',
		// 	fontWeight: 700,
		// 	fontSize: '2.5rem',
		// 	// color: arcBlue,
		// 	lineHeight: 1.5
		// },
		// h3: {
		// 	fontFamily: 'Pacifico',
		// 	fontSize: '2.5rem'
		// 	// color: arcBlue
		// },
		// h4: {
		// 	fontFamily: 'Raleway',
		// 	fontSize: '1.48rem',
		// 	// color: arcBlue,
		// 	fontWeight: 700
		// },
		// subtitle1: {
		// 	fontSize: '1.25rem',
		// 	fontWeight: 300
		// 	// color: arcGrey
		// },
		// subtitle2: {
		// 	fontSize: '1.25rem',
		// 	fontWeight: 300,
		// 	color: 'white'
		// },
		// estimate: {
		// 	fontFamily: 'Pacifico',
		// 	fontSize: '1em',
		// 	textTransform: 'none',
		// 	color: 'white'
		// },
		// learnButton: {
		// 	// borderColor: arcBlue,
		// 	// color: arcBlue,
		// 	borderWidth: 2,
		// 	textTransform: 'none',
		// 	borderRadius: 50,
		// 	fontFamily: 'Roboto',
		// 	fontWeight: 'bold'
		// },
		// arrow: {
		// 	width: '12px',
		// 	marginLeft: '10px'
		// }
	},
});
