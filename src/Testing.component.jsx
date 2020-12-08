import React from 'react';
import { db, storage } from './config/fbConfig';

export const Testing = () => {
	let arr = {};

	const fetchUserInfo = () => {
		const usersRef = db.ref().child('users');
		// console.log(usersRef);

		usersRef.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				// console.log(childSnapshot.key, childSnapshot.val());

				for (let index in arr[childSnapshot.key])
					console.log(
						childSnapshot.val(),
						arr[childSnapshot.key][index]
					);
			});
		});
	};

	const addToArr = (key, value) => {
		arr[key] = arr[key] || [];
		arr[key].push(value);
	};

	const listVideos = () => {
		const storageRef = storage.ref();
		const listRef = storageRef.child('videos');

		listRef
			.listAll()
			.then(function (res) {
				// console.log(res);
				res.prefixes.forEach(function (userRef) {
					// console.log(userRef.name);
					userRef
						.listAll()
						.then(function (userRes) {
							userRes.items.forEach(function (videoRef) {
								console.log(videoRef);
								videoRef
									.getDownloadURL()
									.then(function (url) {
										// console.log(url);

										addToArr(String(userRef.name), url);
									})
									.catch((error) =>
										console.log('error:', error)
									);
							});
						})
						.catch((error) => console.log('error:', error));
				});
			})
			.catch((error) => console.log('error:', error));

		// console.log(arr);
		fetchUserInfo();
	};

	return (
		<div>
			<button onClick={listVideos}>List unapproved videos</button>
		</div>
	);
};

export default Testing;
