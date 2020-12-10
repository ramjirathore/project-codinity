import React, { useState } from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import EventsCard from './EventsCard.component';
import axios from 'axios';
import eventsImage from '../../assets/log/events.jpg';

const useStyles = makeStyles((theme) => ({
	back: {
		backgroundImage: `url(${eventsImage})`,
		color: theme.palette.common.white,
		padding: 30,
		minHeight: '100vh',
	},
}));

const Event = () => {
	const classes = useStyles();
	const [events, setEvents] = useState({ event: [], loading: true });
	if (events.loading) {
		axios
			.get('https://codinity-6ab53.firebaseio.com/events.json')
			.then((response) => {
				let ev = [];
				for (let [, value] of Object.entries(response.data)) {
					ev.push(value);
				}
				setEvents({ event: ev, loading: false });
			});
	}
	console.log(events.event);

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
					{!events.loading
						? events.event.map((card, index) => (
								<Grid
									item
									key={index}
									xs={12}
									sm={6}
									md={6}
									lg={6}
								>
									<EventsCard {...card} />
								</Grid>
						  ))
						: null}
				</Grid>
			</Container>
		</div>
	);
};

export default Event;
