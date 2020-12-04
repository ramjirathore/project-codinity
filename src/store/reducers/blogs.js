import * as actionTypes from '../actions/actionTypes';
const initialState = {
	blogs: null,
	loading: true,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_BLOGS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_BLOGS_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case actionTypes.FETCH_BLOGS_FAILED:
			return {
				...state,
				error: action.err.message,
				loading: false,
			};
		case actionTypes.SET_BLOGS:
			return {
				...state,
				blogs: action.blogs,
			};
		default:
			return state;
	}
};

export default reducer;
