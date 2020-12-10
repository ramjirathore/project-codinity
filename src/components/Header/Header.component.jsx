import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deepOrange } from '@material-ui/core/colors';

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
	List,
	ListItem,
	ListItemText,
	SwipeableDrawer,
	Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Profile from '../../containers/user/profile.component';
import UploadVideo from '../../containers/user/uploadVideo.component';
import CreateEvent from '../../containers/user/createEvent.component';

import { useAuth } from '../../contexts/AuthContext';
import * as actions from '../../store/actions/index';
import { db } from '../../config/fbConfig';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	nav: {
		background: theme.palette.common.black,
		zIndex: theme.zIndex.modal + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		textDecoration: 'none',
		color: 'white',
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
		flexGrow: 0.4,
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
		display: 'flex',
	},
	drawerIcon: {
		height: '30px',
		width: '70px',
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	drawer: {
		backgroundColor: theme.palette.common.black,
		width: 250,
	},
	drawerItem: {
		...theme.typography.tab,
		opacity: 0.7,
		color: 'white',
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.grey,
	},
	drawerItemSelected: {
		opacity: 1,
		// color: '#fc4445',
		color: deepOrange[500],
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		marginRight: 15,
	},
}));

const routes = [
	{ name: 'Home', link: '/' },
	{ name: 'Categories', link: '/categories' },
	{ name: 'Practice', link: '/practice' },
	{ name: 'Events', link: '/events' },
	{ name: 'Blogs', link: '/blogs' },
	{ name: 'About', link: '/about' },
];

const facilities = [
	{
		name: 'Profile',
		activeIndex: 0,
	},
	{
		name: 'My Playlists',
		activeIndex: 1,
	},
	{
		name: 'Upload Video',
		activeIndex: 2,
	},
	{
		name: 'Create an Event',
		activeIndex: 3,
	},
	{
		name: 'Write Blog',
		activeIndex: 4,
	},
];

export const Header = (props) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [userFacility, setUserFacility] = useState(-1);
	const { currentUser, logout } = useAuth();
	const [openDrawer, setOpenDrawer] = useState(false);
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

	useEffect(() => {
		routes.forEach((route, index) => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (value !== index) {
						setValue(index);
					}
					break;
				default:
					break;
			}
		});
		if (currentUser !== null) {
			props.InitUserData(db, currentUser.uid);
		}
	}, [props, value, userFacility, currentUser]);

	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				open={openDrawer}
				onClose={() => {
					setOpenDrawer(false);
					setUserFacility(-1);
				}}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbar} />
				<List disablePadding>
					{facilities.map((facility, index) => (
						<ListItem
							key={`${facility}${index}`}
							divider
							button
							onClick={() => {
								setUserFacility(facility.activeIndex);
							}}
							selected={userFacility === facility.activeIndex}
						>
							<ListItemText
								className={
									userFacility === facility.activeIndex
										? [
												classes.drawerItem,
												classes.drawerItemSelected,
										  ].join(' ')
										: classes.drawerItem
								}
								disableTypography
							>
								{facility.name}
							</ListItemText>
						</ListItem>
					))}
					<ListItem
						divider
						button
						onClick={() => {
							setUserFacility(5);
						}}
						selected={userFacility === 5}
						className={classes.drawerItemEstimate}
					>
						<ListItemText
							className={
								userFacility === 5
									? [
											classes.drawerItem,
											classes.drawerItemSelected,
									  ].join(' ')
									: classes.drawerItem
							}
							disableTypography
						>
							FAQ
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			{/* <IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton> */}
		</React.Fragment>
	);

	return (
		<>
			<AppBar position='fixed' className={classes.nav}>
				{/* {console.log(currentUser.email)} */}
				<Toolbar>
					{currentUser ? (
						<IconButton
							edge='start'
							className={classes.menuButton}
							onClick={() => {
								setOpenDrawer(!openDrawer);
							}}
							color='inherit'
							aria-label='open drawer'
						>
							<MenuIcon />
						</IconButton>
					) : null}
					<Typography
						className={classes.title}
						variant='h4'
						noWrap
						component={Link}
						to='/'
						onClick={() => setValue(0)}
					>
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
							onChange={(e, v) => setValue(v)}
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
						{currentUser ? (
							<Avatar
								alt={props.name}
								src='/static/images/avatar/1.jpg'
								className={classes.orange}
								onClick={() => {
									setOpenDrawer(true);
								}}
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
					{drawer}
				</Toolbar>
			</AppBar>
			{userFacility === 2 ? (
				<UploadVideo upload={true} reset={() => setUserFacility(-1)} />
			) : null}
			{userFacility === 0 ? (
				<Profile profile={true} reset={() => setUserFacility(-1)} />
			) : null}
			{userFacility === 3 ? (
				<CreateEvent
					eventReady={true}
					reset={() => setUserFacility(-1)}
				/>
			) : null}
			<div className={classes.toolbar} />
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		InitUserData: (db, token) => dispatch(actions.initUserData(db, token)),
	};
};
const mapStateToProps = (state) => {
	return {
		name: state.usr.name,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
