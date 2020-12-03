import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	main: {
		flex: 0.3,
	},
	context: {
		flex: 0.5,
	},
});

const DataCard = ({ heading, mainData, currentDate }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography
				component='b'
				variant='h5'
				style={{ color: 'cyan' }}
				className={classes.main}
			>
				{heading}
			</Typography>
			<Typography component='p' variant='h4' className={classes.context}>
				{mainData}
			</Typography>
			<Typography component='p' variant='h6'>
				Last Updated:{' '}
			</Typography>
			<div>
				<Typography> {currentDate}</Typography>
			</div>
		</React.Fragment>
	);
};

export default DataCard;
