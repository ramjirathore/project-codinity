import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

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
        err: error
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
			.get("https://codinity-6ab53.firebaseio.com/categories.json")
			.then((response) => {
                dispatch(setCategories(response.data));
                dispatch(fetchCategoriesSuccess());
			})
			.catch((error) => {
				dispatch(fetchCategoriesFailed(error));
            });
	};
};