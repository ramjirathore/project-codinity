import * as actionTypes from '../actions/actionTypes';

export const setCurrentTag = (tag) => {
	return {
		type: actionTypes.SET_CURRENT_TAG,
		tag,
	};
};
