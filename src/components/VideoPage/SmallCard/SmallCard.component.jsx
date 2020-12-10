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
}));

const SmallCard = ({}) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			{/**Build On click */}
			<CardMedia
				className={classes.cover}
				title='Live from space album cover'
			>
				<ReactPlayer
					// controls
					width='25vw'
					height='18vh'
					url='https://firebasestorage.googleapis.com/v0/b/codinity-6ab53.appspot.com/o/videos%2FqUjH70lBJaVBsRklImEqgJR9qSj1%2FWhatsApp%20Video%202020-12-02%20at%2017.01.17.mp4?alt=media&token=f0a4f58c-77fd-4d6f-b773-f98d16e0e13a'
				/>
				<PlayArrowIcon className={classes.playIcon} />
			</CardMedia>
			<CardContent className={classes.details}>
				{/* <div className={classes.section}> */}
				{/* <Avatar aria-label='recipe' className={classes.avatar}>
						R
					</Avatar> */}
				<div>
					<Typography variant='subtitle1'>
						<b>The React cook-book</b>
					</Typography>
					<Typography variant='body2'>Ramji Rathore</Typography>
				</div>
				{/* </div> */}
				<div className={classes.section}>
					<Typography className={classes.views}>
						1.2M views - 5 days ago
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
};

export default SmallCard;
