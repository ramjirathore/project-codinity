import * as actionTypes from "./actionTypes";
import axios from "axios";

// *******UNDER CONSTRUCTION******** //

export const fetchUserDataStart = () => {
	return {
        type: actionTypes.FETCH_USER_DATA_START,
	};
};


export const fetchUserDataSuccess = () => {
	return {
        type: actionTypes.FETCH_USER_DATA_SUCCESS,
	};
};

export const fetchUserDataFailed = (error) => {
	return {
        type: actionTypes.FETCH_USER_DATA_FAILED,
        err: error
	};
};

export const setUserData = (userData) => {
	return {
		type: actionTypes.SET_USER_DATA,
		userData,
	};
};

export const initUserData = (userToken) => {
    return (dispatch) => {
		dispatch(fetchUserDataStart());
		
		// we need this userToken 
		axios
			.get("https://codinity-6ab53.firebaseio.com/users.json")
			.then((response) => {
                dispatch(setUserData(response.data));
                dispatch(fetchUserDataSuccess());
			})
			.catch((error) => {
				dispatch(fetchUserDataFailed(error));
            });
	};
};