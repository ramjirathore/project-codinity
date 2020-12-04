import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import categoriesReducer from './store/reducers/categories';
import blogsReducer from './store/reducers/blogs';

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
});
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
