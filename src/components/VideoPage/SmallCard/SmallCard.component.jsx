import React from 'react';

import node from '../../../assets/categoriesForeground/nodejs.jpg';

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
			opacity: 0.9,
			cursor: 'pointer',
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
		opacity: 0,
		height: 48,
		width: 48,
		'&:hover': {
			opacity: 1,
			color: theme.palette.common.black,
			cursor: 'pointer',
		},
	},
	views: {
		// paddingLeft: 5,
		fontFamily: 'Roboto',
		opacity: 0.8,
		fontSize: 12,
	},
}));

const SmallCard = () => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.cover}
				image={node}
				title='Live from space album cover'
			>
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
					<Typography variant='caption'>Ramji Rathore</Typography>
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
