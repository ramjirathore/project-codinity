import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Header from './components/Header/Header.component';
import Landing from './components/Landing/Landing.component';
import Practice from './containers/practice/practice.component';
import Footer from './components/Footer/Footer.component';

import SimpleHeader from './components/VideoPage/SimpleHeader/SimpleHeader.component';
import Video from './components/VideoPage/VideoPage.component';

import theme from './components/UI/theme';

// import './App.css';





const App = () => {

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<>
								<Header />
								<Landing />
								<Footer />
							</>
						)}
					/>
					<Route exact path='/practice' component={Practice} />
					<Route
						exact
						path='/categories'
						component={() => <div>All categories here</div>}
					/>
					<Route
						exact
						path='/about'
						component={() => <div>About page</div>}
					/>
					<Route
						exact
						path='/video/:id'
						render={() => (
							<>
								<SimpleHeader />
								<Video />
							</>
						)}
					/>
				</Switch>
				{/* <Footer /> */}
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
