import * as actionTypes from './actionTypes';
import axios from 'axios';

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
		err: error,
	};
};

export const setUserData = (userData) => {
	return {
		type: actionTypes.SET_USER_DATA,
		userData,
	};
};

export const initUserData = (db, userToken) => {
	return (dispatch) => {
		dispatch(fetchUserDataStart());
		const usersRef = db.ref().child('users');
		// console.log(usersRef);

		usersRef.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				// console.log(childSnapshot.key, childSnapshot.val());
				if (childSnapshot.key === String(userToken)) {
					console.log(childSnapshot.val());
					dispatch(setUserData(response.data));
				}
			});
		});
	};
};
