import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';

import LongText from './LongText.component';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	details: {
		background: '#f3f3f3',
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	content: {
		flex: '1 0 auto',
	},
	controls: {
		// alignItems: 'center',
		padding: '8px 15px',
		fontFamily: 'Roboto',
		// paddingLeft: theme.spacing(1),
		// paddingBottom: theme.spacing(1),
	},
	section: {
		padding: '20px 0',
		display: 'flex',
		justifyContent: 'space-between',
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

const EventsCard = ({ content, title, uploadedOn, name, hashTags }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<div style={{ textAlign: 'center' }}>
						<Typography variant='h5'>
							<b>{title}</b>
						</Typography>
					</div>
					<div className={classes.section}>
						<div>
							<Typography className={classes.views}>
								Written By
							</Typography>
							<Typography variant='body1'>{name}</Typography>
						</div>

						<div>
							<Typography variant='body1'>
								Uploaded On: {uploadedOn}
							</Typography>
						</div>
					</div>
					<div>
						{/* <pre> */}
						<LongText content={content} limit='250' />
						{/* </pre> */}
					</div>
				</CardContent>

				<div className={classes.hastags}>
					<Typography style={{ fontSize: 15, color: 'green' }}>
						{hashTags}
					</Typography>
				</div>
			</div>
		</Card>
	);
};

export default EventsCard;
