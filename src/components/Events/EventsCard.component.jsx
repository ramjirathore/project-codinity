import React from 'react';
import {
	makeStyles,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	details: {
		background: '#f3f3f3',
		display: 'flex',
		flexDirection: 'column',
		minWidth: 350,
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: '100%',
	},
	controls: {
		// alignItems: 'center',
		padding: '8px 15px',
		fontFamily: 'Roboto',
		// paddingLeft: theme.spacing(1),
		// paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
	section: {
		marginTop: 10,
	},
	views: {
		// paddingLeft: 5,
		fontFamily: 'Roboto',
		opacity: 0.5,
		fontSize: 15,
	},
	hastags: {
		padding: '10px 0px 10px 15px',
		fontFamily: 'Roboto',
	},
}));

const EventsCard = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<div>
						<Typography variant='h5'>
							The React cook-book
						</Typography>
					</div>
					<div className={classes.section}>
						<Typography className={classes.views}>
							Organizer
						</Typography>
						<Typography variant='body1'>Ramji Rathore</Typography>
					</div>
				</CardContent>
				<div className={classes.controls}>
					<Typography
						variant='body1'
						style={{
							color: 'blue',
							cursor: 'pointer',
							margin: '5px 0',
						}}
						onClick={() =>
							window.open('https://meet.google.com/zys-ypms-szm')
						}
						//**temp link */
					>
						<b>Join Meet</b>
					</Typography>
					<Typography variant='body2'>Date: 15/12/2020</Typography>
				</div>
				<div className={classes.hastags}>
					<Typography style={{ fontSize: 15, color: 'green' }}>
						#react #redux #firebase
					</Typography>
				</div>
			</div>
			<CardMedia
				className={classes.cover}
				style={{
					backgroundImage:
						'url(https://source.unsplash.com/random/?abstract)',
				}}
				title='Live from space album cover'
			/>
		</Card>
	);
};

export default EventsCard;
