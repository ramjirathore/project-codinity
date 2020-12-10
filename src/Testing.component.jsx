import React from 'react';
import { db } from './config/fbConfig';

/*
in db, unapproved videos -> nodes 
Visit the nodes -> Delete from storage -> Delete node
*/

export const Testing = () => {

    const uidArr = ['2AuiUKiYNqcmqA0gpoW5EMcVFs62', 'qUjH70lBJaVBsRklImEqgJR9qSj1'];      // list of user ids received

	const rejectingVideos = () => {
        console.log("clicked");
        const videosRef = db.ref().child('unapproved videos');
        
        for(let index in uidArr)
        {
            let uid = uidArr[index];
            const vidRef = videosRef.child(`${uid}`);
            let video;
            vidRef.once('value', (snapshot) => {
                if(snapshot.val() === null)
                    return;

                // console.log(snapshot.val().file); (not available)

                video = snapshot.val();

                video = {
                    ...video,
                    uid
                }
            })
            .then( () => {
                
                // removing from storage (incomplete)
            })
            .then( () => {
                console.log("deleting");
                // vidRef.remove();
            })
        }
	};

	return (
		<div>
			<button onClick={rejectingVideos}>Manage approved videos</button>
		</div>
	);
};

export default Testing;
