import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const fetchBlogsStart = () => {
	return {
		type: actionTypes.FETCH_BLOGS_START,
	};
};

export const fetchBlogsSuccess = () => {
	return {
		type: actionTypes.FETCH_BLOGS_SUCCESS,
	};
};

export const fetchBlogsFailed = (error) => {
	return {
		type: actionTypes.FETCH_BLOGS_FAILED,
		err: error,
	};
};

export const setBlogs = (blogs) => {
	return {
		type: actionTypes.SET_BLOGS,
		blogs,
	};
};

export const initBlogs = () => {
	return (dispatch) => {
		dispatch(fetchBlogsStart());
		axios
			.get(`${process.env.REACT_APP_DATABASE_URL}/blogs.json`)
			.then((response) => {
				// let categories = [];
				// for (let [key, value] of Object.entries(response.data)) {
				// 	categories.push({
				// 		key,
				// 		videos: value,
				// 		count: value.length,
				// 	});
				// }

				dispatch(setBlogs(response.data));
				dispatch(fetchBlogsSuccess());
			})
			.catch((error) => {
				dispatch(fetchBlogsFailed(error));
			});
	};
};
