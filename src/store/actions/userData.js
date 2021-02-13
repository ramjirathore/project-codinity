import * as actionTypes from './actionTypes';

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

		usersRef
			.once('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					if (childSnapshot.key === String(userToken)) {
						dispatch(setUserData(childSnapshot.val()));
					}
				});
			})
			.catch((err) => fetchUserDataFailed(err));
	};
};
