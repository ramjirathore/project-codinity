// import * as actionTypes from "../actions/actionTypes";
import firebaseDb from '../../config/fbConfig';
// import axios from "axios";

export const addVideo = (category, video) => {
    return (dispatch) => {
        // dispatch(addVideoObjectStart());
        firebaseDb.child(`categories/${category}`).push(video, err => {
            console.log(err);
        })
		// axios
		// 	.get("https://codinity-6ab53.firebaseio.com/categories.json")
        //     .then((response) => {
        //         console.log(response);
        //         dispatch(addVideoObjectSuccess());
		// 	})
		// 	.catch((error) => {
		// 		dispatch(addVideoObjectFailed(error));
        //     });
	};
};