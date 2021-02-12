import React from 'react';
import { makeStyles, Typography, Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

import facebook from '../../assets/social/facebook.svg';
import twitter from '../../assets/social/twitter.svg';
import instagram from '../../assets/social/instagram.svg';

// const drawerWidth = window.location.pathname === '/practice' ? 240 : 0;
const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.common.grey,
		padding: theme.spacing(6),
		// width: `calc(100% - ${drawerWidth}px)`,
		// marginLeft: drawerWidth
	},
	link: {
		textDecoration: 'none',
		color: 'white',
		cursor: 'pointer',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.2em',
		},
	},
	icon: {
		width: '2em',
		height: '2em',
	},
}));

function Copyright() {
	return (
		<Typography
			variant='body2'
			color='textSecondary'
			align='center'
			style={ { color: 'white', padding: 10 } }
		>
			{'Copyright © ' }
			<Link
				color='inherit'
				to='/'
				style={ { color: 'white', textDecoration: 'none' } }
			>
				Codinity
			</Link>{ ' ' }
			{new Date().getFullYear() }
			{'.' }
			<br />
			All rights reserved.
		</Typography>
	);
}

const Footer = (props) => {
	const classes = useStyles();
	return (
		<footer className={ classes.footer }>
			<Typography
				variant='h4'
				align='center'
				gutterBottom
				style={ { color: 'white' } }
			>
				CODINITY
			</Typography>

			<Container maxWidth='md' style={ { padding: 20 } }>
				<Grid
					container
					justify='space-between'
					style={ { color: 'white' } }
				>
					<Grid item>
						<Typography
							variant='h5'
							className={ classes.link }
							component={ Link }
							to='/'
						>
							Home
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant='h5'
							className={ classes.link }
							component={ Link }
							to='/categories'
						>
							Categories
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant='h5'
							className={ classes.link }
							component={ Link }
							to='/practice'
						>
							Practice
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant='h5'
							className={ classes.link }
							component={ Link }
							to='/events'
						>
							Events
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant='h5'
							className={ classes.link }
							component={ Link }
							to='/blogs'
						>
							Blogs
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant='h5'
							className={ classes.link }
							component={ Link }
							to='/about'
						>
							About
						</Typography>
					</Grid>
				</Grid>
			</Container>
			<Grid
				container
				justify='center'
				spacing={ 2 }
				style={ { padding: 10 } }
			>
				<Grid
					item
					component={ 'a' }
					href='https://www.instagram.com'
					rel='noopener noreferrer'
					target='_blank'
				>
					<img
						className={ classes.icon }
						alt='instagram logo'
						src={ instagram }
					/>
				</Grid>
				<Grid
					item
					component={ 'a' }
					href='https://www.twitter.com'
					rel='noopener noreferrer'
					target='_blank'
				>
					<img
						className={ classes.icon }
						alt='twitter logo'
						src={ twitter }
					/>
				</Grid>
				<Grid
					item
					component={ 'a' }
					href='https://www.facebook.com'
					rel='noopener noreferrer'
					target='_blank'
				>
					<img
						className={ classes.icon }
						alt='facebook logo'
						src={ facebook }
					/>
				</Grid>
			</Grid>
			<Typography
				variant='body2'
				align='center'
				style={ { color: 'cyan', opacity: 0.8, padding: 5 } }
			>
				Designed and created by the cool minor team :)
			</Typography>
			<Copyright />
		</footer>
	);
};

export default Footer;
