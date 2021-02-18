import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const fetchCategoriesStart = () => {
	return {
		type: actionTypes.FETCH_CATEGORIES_START,
	};
};

export const fetchCategoriesSuccess = () => {
	return {
		type: actionTypes.FETCH_CATEGORIES_SUCCESS,
	};
};

export const fetchCategoriesFailed = (error) => {
	return {
		type: actionTypes.FETCH_CATEGORIES_FAILED,
		err: error,
	};
};

export const setCategories = (categories) => {
	return {
		type: actionTypes.SET_CATEGORIES,
		categories,
	};
};

export const initCategories = () => {
	return (dispatch) => {
		dispatch(fetchCategoriesStart());
		axios
			.get(`${process.env.REACT_APP_DATABASE_URL}/categories.json`)
			.then((response) => {
				let categories = new Map();
				for (let [key, value] of Object.entries(response.data)) {
					// categories[key].push({
					// 	videos: value,
					// 	count: value.length,
					// });
					categories.set(key, value);
				}

				dispatch(setCategories(categories));
				dispatch(fetchCategoriesSuccess());
			})
			.catch((error) => {
				dispatch(fetchCategoriesFailed(error));
			});
	};
};
