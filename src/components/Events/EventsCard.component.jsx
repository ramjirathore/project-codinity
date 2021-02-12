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
		flexWrap: 'wrap',
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

const EventsCard = ({ link, title, date, name, time, hashTags }) => {
	const classes = useStyles();

	return (
		<Card className={ classes.root }>
			<div className={ classes.details }>
				<CardContent className={ classes.content }>
					<div>
						<Typography variant='h5'>{ title }</Typography>
					</div>
					<div className={ classes.section }>
						<Typography className={ classes.views }>
							Organizer
						</Typography>
						<Typography variant='body1'>{ name }</Typography>
					</div>
				</CardContent>
				<div className={ classes.controls }>
					<Typography
						variant='body1'
						style={ {
							color: 'blue',
							cursor: 'pointer',
							margin: '5px 0',
						} }
						onClick={ () => window.open(link) }
					//**temp link */
					>
						<b>Join Meet</b>
					</Typography>
					<div
						style={ {
							display: 'flex',
							justifyContent: 'space-between',
							maxWidth: '70%',
						} }
					>
						<Typography variant='body2'>Date: { date }</Typography>
						<Typography variant='body2'>Time: { time }</Typography>
					</div>
				</div>
				<div className={ classes.hastags }>
					<Typography style={ { fontSize: 15, color: 'green' } }>
						{ hashTags }
					</Typography>
				</div>
			</div>
			<CardMedia
				className={ classes.cover }
				src='https://source.unsplash.com/random/?abstract'
				style={ {
					backgroundImage: `url(https://source.unsplash.com/random/?technology)`,
				} }
				title='Live from space album cover'
			/>
		</Card>
	);
};

export default EventsCard;
