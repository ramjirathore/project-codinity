import React from 'react';

import { Paper, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	nav: {
		background: theme.palette.common.grey,
		height: '3.5rem',
		display: 'flex',
		alignItems: 'center',
	},
	company: {
		marginLeft: 20,
		cursor: 'pointer',
		color: 'white',
		textDecoration: 'none',
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	title: {
		color: 'white',
		fontSize: '1.2em',
		fontFamily: 'Roboto',
	},
}));

export const Header = () => {
	const classes = useStyles();

	return (
		<>
			<Paper square position='static' className={classes.nav}>
				<Typography
					className={classes.company}
					variant='h4'
					noWrap
					component={Link}
					to='/'
				>
					Codinity
				</Typography>
				<hr size='2' style={{ height: '40%', margin: '0 20px' }} />
				<Typography className={classes.title}>
					CHILLED SERENITY
				</Typography>
			</Paper>
		</>
	);
};

export default Header;
