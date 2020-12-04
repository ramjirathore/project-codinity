import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
	Tab,
	Tabs,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Button,
	fade,
	makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	nav: {
		background: theme.palette.common.black,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		marginLeft: '2.5em',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '15ch',
		},
	},
	options: {
		display: 'flex',
		flexGrow: 0.6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	opt: {
		...theme.typography.tab,
		fontSize: '1.2em',
		fontFamily: 'Roboto',
		textTransform: 'uppercase',
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	log: {
		marginLeft: 'auto',
	},
}));

const routes = [
	{ name: 'Home', link: '/' },
	{ name: 'Categories', link: '/categories' },
	{ name: 'Practice', link: '/practice' },
	{ name: 'About', link: '/about' },
];

export const Header = (props) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const { currentUser, logout } = useAuth();
	const [error, setError] = useState('');

	console.log(currentUser);

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
			<AppBar position='fixed' className={classes.nav}>
				{/* {console.log(currentUser.email)} */}
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='open drawer'
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant='h4' noWrap>
						Codinity
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<div className={classes.options}>
						<Tabs
							indicatorColor='primary'
							value={value}
							onChange={(e, val) => setValue(val)}
							className={classes.tabContainer}
						>
							{routes.map((route, index) => (
								<Tab
									key={`${route}${index}`}
									className={classes.opt}
									component={Link}
									to={route.link}
									label={route.name}
									// onMouseOver={route.mouseOver}
								/>
							))}
						</Tabs>
					</div>
					<div className={classes.log}>
						<Button
							variant='contained'
							onClick={currentUser ? handleLogout : null}
						>
							{currentUser ? 'Logout' : 'Login'}
						</Button>
					</div>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar} />
		</>
	);
};

export default Header;
