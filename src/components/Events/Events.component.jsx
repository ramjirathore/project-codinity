import React from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import EventsCard from './EventsCard.component';

import eventsImage from '../../assets/log/events.jpg';

const useStyles = makeStyles((theme) => ({
	back: {
		backgroundImage: `url(${eventsImage})`,
		// position: 'relative',
		// backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		// marginBottom: theme.spacing(4),
		// backgroundSize: 'cover',
		// backgroundRepeat: 'no-repeat',
		// backgroundPosition: 'center',
		padding: 40,
	},
}));

const categoriesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Event = () => {
	const classes = useStyles();

	return (
		<div className={classes.back}>
			<Container maxWidth='lg'>
				<Grid container>
					<Grid item md={12}>
						<div className={classes.HeaderContent}>
							<Typography
								component='h1'
								variant='h2'
								color='inherit'
								gutterBottom
								elevation={10}
								style={{ fontWeight: 600 }}
							>
								EVENTS
							</Typography>
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={4}>
					{categoriesList.map((card, index) => (
						<Grid item key={index} xs={12} sm={6} md={6} lg={6}>
							<EventsCard
							// imgSrc={card.imgSrc}
							// field={card.field}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default Event;
