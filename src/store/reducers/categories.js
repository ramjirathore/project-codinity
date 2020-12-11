import * as actionTypes from '../actions/actionTypes';
const initialState = {
	categories: null,
	loading: true,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CATEGORIES_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case actionTypes.FETCH_CATEGORIES_FAILED:
			return {
				...state,
				error: action.err.message,
				loading: false,
			};
		case actionTypes.SET_CATEGORIES:
			return {
				...state,
				categories: action.categories,
			};
		default:
			return state;
	}
};

export default reducer;
