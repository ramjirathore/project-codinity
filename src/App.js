import React, { useEffect } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { AuthProvider } from './contexts/AuthContext';

import AdminController from './containers/admin/Controller.component';

import Header from './components/Header/Header.component';
import Landing from './components/Landing/Landing.component';
import Practice from './containers/practice/practice.component';
import Footer from './components/Footer/Footer.component';
import SignUp from './components/SignUp/SignUp.component';
import SignIn from './components/SignIn/SignIn.component';
import SimpleHeader from './components/VideoPage/SimpleHeader/SimpleHeader.component';
import Video from './components/VideoPage/VideoPage.component';
import Categories from './components/Categories/Categories.component';
import About from './components/About/About.component';
import Events from './components/Events/Events.component';

import Testing from './Testing.component';

const App = (props) => {
	useEffect(() => {
		props.InitCategories();
		props.InitBlogs();
	});

	let routes = null;

	console.log(process.env.REACT_APP_ADMIN_ID, props.email);

	if (process.env.REACT_APP_ADMIN_ID === props.email) {
		routes = <Route exact path='/admin' component={AdminController} />;
	}

	return (
		<React.Fragment>
			<AuthProvider>
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<>
								<Header {...props} />
								<Landing {...props} />
								<Footer />
							</>
						)}
					/>
					<Route
						exact
						path='/practice'
						render={() => (
							<>
								<Header {...props} />
								<Practice {...props} />
							</>
						)}
					/>
					<Route
						exact
						path='/categories'
						render={() => (
							<>
								<Header {...props} />
								<Categories {...props} />
								<Footer />
							</>
						)}
					/>
					<Route
						exact
						path='/events'
						render={() => (
							<>
								<Header {...props} />
								<Events />
							</>
						)}
					/>
					<Route
						exact
						path='/blogs'
						component={() => <div>All blogs here</div>}
					/>
					<Route exact path='/login' component={SignIn} />
					<Route exact path='/signup' component={SignUp} />
					<Route
						exact
						path='/about'
						render={() => (
							<>
								<Header {...props} />
								<About />
							</>
						)}
					/>
					<Route
						exact
						path='/video/:id'
						render={() => (
							<>
								<SimpleHeader />
								<Video {...props} />
							</>
						)}
					/>
					{routes}
					{/* Testing Component */}
					<Route exact path='/testing' component={Testing} />
					<Redirect to='/' />
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

const mapStateToProps = (state) => {
	return {
		email: state.usr.email,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
