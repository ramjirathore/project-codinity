import React from 'react';

import ReactPlayer from 'react-player/lazy';

import {
	Card,
	CardMedia,
	makeStyles,
	CardContent,
	Typography,
	// Avatar,
} from '@material-ui/core';
import { db } from '../../../config/fbConfig';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		margin: 5,
		borderRadius: 0,
		background: theme.palette.common.grey,
		color: 'white',
		height: 120,
		'&:hover': {
			opacity: 0.8,
			cursor: 'pointer',
			boxShadow:
				'0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		},
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cover: {
		width: 201,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		backgroundColor: 'grey',
		height: 36,
		width: 36,
	},
	section: {
		display: 'flex',
	},
	playIcon: {
		position: 'absolute',
		opacity: 0,
		height: 48,
		width: 48,
		'&:hover': {
			opacity: 1,
			cursor: 'pointer',
		},
	},
	views: {
		// paddingLeft: 5,
		fontFamily: 'Roboto',
		opacity: 0.6,
		fontSize: 12,
	},
	over: {
		width: 201,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
}));

const SmallCard = (props) => {
	const {
		name,
		title,
		uploadedOn,
		views,
		url,
		tag,
		description,
		videoId,
		history,
		reFetchCategories,
	} = props;
	const classes = useStyles();

	const handleVideoClick = (props) => {
		const videoRef = db.ref(`categories/${tag}/${videoId}`);

		let video;
		videoRef
			.once('value', (snapshot) => {
				video = snapshot.val();
			})
			.then(() => {
				videoRef.set({
					...video,
					views: views + 1,
				});
			})
			.then(() => {
				reFetchCategories();
				localStorage.setItem(
					'currentVid',
					JSON.stringify({
						url,
						views,
						title,
						name,
						tag,
						description,
						videoId,
					})
				);
				history.push(videoId, '_blank');
			});
	};

	return (
		<Card className={classes.root} onClick={handleVideoClick}>
			{/**Build On click */}
			<CardMedia
				className={classes.cover}
				title='Live from space album cover'
			>
				<ReactPlayer
					// controls
					width='25vw'
					height='18vh'
					url={url}
				/>
				<PlayArrowIcon className={classes.playIcon} />
			</CardMedia>
			<CardContent className={classes.details}>
				{/* <div className={classes.section}> */}
				{/* <Avatar aria-label='recipe' className={classes.avatar}>
						R
					</Avatar> */}
				<div>
					<Typography variant='subtitle1' className={classes.over}>
						<b>{title}</b>
					</Typography>
					<Typography variant='body2'>{name}</Typography>
				</div>
				{/* </div> */}
				<div className={classes.section}>
					<Typography className={classes.views}>
						{views} views - {uploadedOn}
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
};

export default SmallCard;
