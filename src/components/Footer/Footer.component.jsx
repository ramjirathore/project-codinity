import React from 'react';
import { makeStyles, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: '#eee',
		padding: theme.spacing(6)
	}
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Codinity
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
			<br />
			All rights reserved.
		</Typography>
	);
}

const Footer = () => {
	const classes = useStyles();
	return (
		// <div style={{ background: '#444', height: '100vh' }}>
		<footer className={classes.footer}>
			<Typography variant="h6" align="center" gutterBottom>
				Footer
			</Typography>
			<Typography
				variant="subtitle1"
				align="center"
				color="textSecondary"
				component="p"
			>
				Designed and created by the cool minor team!
			</Typography>
			<Copyright />
		</footer>
		// </div>
	);
};

export default Footer;
