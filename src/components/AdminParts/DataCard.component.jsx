import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	main: {
		flex: 0.3,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	context: {
		flex: 0.5,
		textAlign: 'center',
		fontWeight: 600,
	},
});

const DataCard = ({ heading, mainData, currentDate, headColor }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography
				variant='h5'
				style={{ color: headColor }}
				className={classes.main}
			>
				{heading}
			</Typography>
			<Typography component='p' variant='h4' className={classes.context}>
				{mainData}
			</Typography>
			<Typography
				style={{
					textAlign: 'center',
					fontSize: '1rem',
				}}
			>
				<b>Last Updated</b>{' '}
			</Typography>
			<div style={{ textAlign: 'center' }}>
				<Typography> {currentDate}</Typography>
			</div>
		</React.Fragment>
	);
};

export default DataCard;
