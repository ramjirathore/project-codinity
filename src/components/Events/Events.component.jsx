import React from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import EventsCard from './EventsCard.component';

import eventsImage from '../../assets/log/events.jpg';

const useStyles = makeStyles((theme) => ({
	back: {
		backgroundImage: `url(${eventsImage})`,
		color: theme.palette.common.white,
		padding: 30,
		minHeight: '100vh',
	},
}));

const categoriesList = [1, 2, 3, 4, 5, 6];

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
							<EventsCard />
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default Event;
