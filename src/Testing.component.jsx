import React from 'react';
import { db } from './config/fbConfig';

/*
in db, unapproved videos -> nodes 
Visit the nodes -> insert the videos according to their tag and uid to Categories -> Delete node
*/

export const Testing = () => {

    const uidArr = ['2AuiUKiYNqcmqA0gpoW5EMcVFs62', 'qUjH70lBJaVBsRklImEqgJR9qSj1'];      // list of user ids received

	const approvingVideos = () => {
        console.log("clicked");
        const videosRef = db.ref().child('unapproved videos');
        
        for(let index in uidArr)
        {
            let uid = uidArr[index];
            const vidRef = videosRef.child(`${uid}`);
            let video;
            vidRef.once('value', (snapshot) => {
                video = snapshot.val();

                video = {
                    ...video,
                    uid
                }
            })
            .then( () => {
                // console.log(uid, video);
                const ref = db.ref(`categories/${video.tag}/${uid}`);
                ref.set(video);
            })
            .then( () => {
                vidRef.remove();
            })
        }
	};

	return (
		<div>
			<button onClick={approvingVideos}>Manage approved videos</button>
		</div>
	);
};

export default Testing;
