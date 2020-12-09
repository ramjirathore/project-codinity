import * as actionTypes from './actionTypes';

export const fetchRequestStart = () => {
	return {
		type: actionTypes.FETCH_REQUESTS_START,
	};
};

export const fetchRequestSuccess = () => {
	return {
		type: actionTypes.FETCH_REQUESTS_SUCCESS,
	};
};

export const fetchRequestFailed = (error) => {
	return {
		type: actionTypes.FETCH_REQUESTS_FAILED,
		err: error,
	};
};

export const setRequest = (req) => {
	return {
		type: actionTypes.SET_REQUESTS,
		req,
	};
};

export const initRequest = (db) => {
	return (dispatch) => {
		dispatch(fetchRequestStart());

		const usersRef = db.ref().child('unapproved videos');
		// console.log(usersRef);
		let unapproved = [];
		usersRef
			.once('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					// console.log(childSnapshot.key, childSnapshot.val());
					// console.log('requests', childSnapshot.val());
					unapproved.push(childSnapshot.val());
				});
				dispatch(fetchRequestSuccess());
				dispatch(setRequest(unapproved));
			})
			.catch((err) => dispatch(fetchRequestFailed(err)));
	};
};
