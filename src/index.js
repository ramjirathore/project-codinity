import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import categoriesReducer from './store/reducers/categories';
import blogsReducer from './store/reducers/blogs';
import userDataReducer from './store/reducers/userData';
import requestReducer from './store/reducers/requests';
import currentTag from './store/reducers/currentTag';

import theme from './components/UI/theme';
import App from './App';
import './index.css';

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose;

const rootReducer = combineReducers({
	ctgr: categoriesReducer,
	blg: blogsReducer,
	usr: userDataReducer,
	req: requestReducer,
	cTag: currentTag,
});
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
