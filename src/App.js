import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header.component';
import Landing from './components/Landing/Landing.component';
import Practice from './containers/practice/practice.component';
import Footer from './components/Footer/Footer.component';


import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import SimpleHeader from './components/VideoPage/SimpleHeader/SimpleHeader.component';
import Video from './components/VideoPage/VideoPage.component';
import { Button } from '@material-ui/core';

const App = (props) => {
	// added on temp basis
	const addVideo = () => {
		props.addVideoObject({
			creator: "Prerna Singh",
			id: "5dRGRueKU3M",
			rating: 4.5,
			title: "Introduction to Dynammic Programming",
			uploaded: "28-11-2020"
		});
	}
	return (
		<React.Fragment>
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
			</React.Fragment>
	);
};


const mapDispatchToProps = (dispatch) => {
	return {
		addVideoObject: (video) => dispatch(actions.addVideo('machineLsearning', video)),
	};
};


export default connect(null,mapDispatchToProps)(App);
