import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Header from './components/Header/Header.component';
import Landing from './components/Landing/Landing.component';
import Footer from './components/Footer/Footer.component';

import theme from './components/UI/theme';

// import './App.css';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<div>
				<Header />
				<Landing />
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App;
