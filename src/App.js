import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header.component';
import Landing from './components/Landing/Landing.component';
import Practice from './containers/practice/practice.component';
import Footer from './components/Footer/Footer.component';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import AdminController from './containers/admin/Controller.component';

import SignUp from './components/SignUp/SignUp.component';
import SignIn from './components/SignIn/SignIn.component';
import SimpleHeader from './components/VideoPage/SimpleHeader/SimpleHeader.component';

import Video from './components/VideoPage/VideoPage.component';

import { AuthProvider } from './contexts/AuthContext';

const App = (props) => {
	// added on temp basis
	// const addVideo = () => {
	// 	props.addVideoObject({
	// 		creator: 'Prerna Singh',
	// 		id: '5dRGRueKU3M',
	// 		rating: 4.5,
	// 		title: 'Introduction to Dynammic Programming',
	// 		uploaded: '28-11-2020',
	// 	});
	// };
	useEffect(() => {
		props.InitCategories();
		props.InitBlogs();
	});
	return (
		<React.Fragment>
			<AuthProvider>
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
						path='/events'
						component={() => <div>All events</div>}
					/>
					<Route
						exact
						path='/blogs'
						component={() => <div>All blogs here</div>}
					/>
					<Route
						exact
						path='/about'
						component={() => <div>About page</div>}
					/>
					<Route exact path='/login' component={SignIn} />
					<Route exact path='/signup' component={SignUp} />
					<Route exact path='/admin' component={AdminController} />
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
			</AuthProvider>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addVideoObject: (video) =>
			dispatch(actions.addVideo('dataStructure', video)),
		InitCategories: () => dispatch(actions.initCategories()),
		InitBlogs: () => dispatch(actions.initBlogs()),
	};
};

export default connect(null, mapDispatchToProps)(App);
