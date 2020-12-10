import React, { useState } from 'react';

import {
	Paper,
	makeStyles,
	Typography,
	Button,
	Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import { deepOrange } from '@material-ui/core/colors';

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
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		marginRight: 15,
	},
}));

export const Header = () => {
	const classes = useStyles();
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			window.location.assign('/');
		} catch {
			setError('Failed to log out');
		}

		console.log(error);
	}
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
				<div
					style={{ marginLeft: 'auto', display: 'flex', padding: 20 }}
				>
					{currentUser ? (
						<Avatar
							alt='Hemant Panwar'
							src='/static/images/avatar/1.jpg'
							className={classes.orange}
						/>
					) : null}
					<Button
						component={Link}
						to={currentUser ? '/' : '/login'}
						variant='contained'
						onClick={currentUser ? handleLogout : null}
					>
						{currentUser ? 'Logout' : 'Login'}
					</Button>
				</div>
			</Paper>
		</>
	);
};

export default Header;
