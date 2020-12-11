import * as actionTypes from '../actions/actionTypes';
const initialState = {
	tag: 'dataStructure',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_TAG:
			return {
				...state,
				tag: action.tag,
			};
		default:
			return state;
	}
};

export default reducer;
