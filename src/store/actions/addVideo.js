// import * as actionTypes from "../actions/actionTypes";
import firebaseDb from '../../config/fbConfig';
// import axios from "axios";

export const addVideo = (category, video) => {
	return (dispatch) => {
		// dispatch(addVideoObjectStart());
		firebaseDb.child(`categories/${category}`).push(video, (err) => {});
		// axios
		// 	.get(`${process.env.REACT_APP_DATABASE_URL}/categories.json`)
		//     .then((response) => {
		//         console.log(response);
		//         dispatch(addVideoObjectSuccess());
		// 	})
		// 	.catch((error) => {
		// 		dispatch(addVideoObjectFailed(error));
		//     });
	};
};
