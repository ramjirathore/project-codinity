import * as actionTypes from '../actions/actionTypes';
const initialState = {
	name: '',
	email: '',
	college: '',
	loading: true,
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_USER_DATA_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_USER_DATA_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case actionTypes.FETCH_USER_DATA_FAILED:
			return {
				...state,
				error: action.err.message,
				loading: false,
			};
		case actionTypes.SET_USER_DATA:
			return {
				...state,
				name: action.userData.name,
				email: action.userData.email,
				college: action.userData.college,
			};
		default:
			return state;
	}
};

export default reducer;
