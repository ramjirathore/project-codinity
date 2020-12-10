import React from 'react';
import { db } from './config/fbConfig';

/*
in db, unapproved videos -> nodes 
Visit the nodes -> insert the videos according to their tag and uid to Categories -> Delete node
*/

export const Testing = () => {

    const uidArr = ['2AuiUKiYNqcmqA0gpoW5EMcVFs62', 'qUjH70lBJaVBsRklImEqgJR9qSj1'];      // list of user ids received

    const extractToken = (url) => {
        let pos = url.indexOf('token');
        let res = url.substring(pos+6);
        return res;
    }

	const approvingVideos = () => {
        console.log("clicked");
        const videosRef = db.ref().child('unapproved videos');
        
        for(let index in uidArr)
        {
            let uid = uidArr[index];
            const vidRef = videosRef.child(`${uid}`);
            let video, videoId;
            vidRef.once('value', (snapshot) => {
                video = snapshot.val();

                video = {
                    ...video,
                    uid
                }
            })
            .then( () => {
                videoId = extractToken(video.url);
                // console.log(videoId);
            })
            .then( () => {
                // console.log(uid, video);
                const ref = db.ref(`categories/${video.tag}/${videoId}`);
                console.log("pushing", ref.toString());
                // ref.set(video);
            })
            .then( () => {
                console.log("deleting");
                // vidRef.remove();
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
