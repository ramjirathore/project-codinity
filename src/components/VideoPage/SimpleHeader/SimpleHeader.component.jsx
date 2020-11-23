import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link, Paper } from '@material-ui/core';

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
				<Typography className={classes.company} variant='h4' noWrap>
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
