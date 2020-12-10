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

export const setTotalUsers = (users) => {
	return {
		type: actionTypes.SET_TOTAL_USERS,
		users,
	};
};

export const initUserData = (db, userToken) => {
	return (dispatch) => {
		dispatch(fetchUserDataStart());
		const usersRef = db.ref().child('users');
		// console.log(usersRef);
		let users = 0;
		usersRef
			.once('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					// console.log(childSnapshot.key, childSnapshot.val());
					if (childSnapshot.key === String(userToken)) {
						// console.log('userData', childSnapshot.val());
						dispatch(setUserData(childSnapshot.val()));
					}
					users += 1;
				});
				console.log(users);
				dispatch(setTotalUsers(users));
			})
			.catch((err) => fetchUserDataFailed(err));
	};
};
