import * as actionTypes from '../actions/actionTypes';
const initialState = {
	unapproved: [],
	loading: false,
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_REQUESTS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_REQUESTS_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case actionTypes.FETCH_REQUESTS_FAILED:
			return {
				...state,
				error: action.err.message,
				loading: false,
			};
		case actionTypes.SET_REQUESTS:
			return {
				...state,
				unapproved: action.req,
			};
		default:
			return state;
	}
};

export default reducer;
