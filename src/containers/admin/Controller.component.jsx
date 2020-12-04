import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
	makeStyles,
	Box,
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Badge,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletSharpIcon from '@material-ui/icons/AccountBalanceWalletSharp';
import BugReportSharpIcon from '@material-ui/icons/BugReportSharp';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

import { secondaryListItems } from '../../components/AdminParts/ListItems.component';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
		textTransform: 'uppercase',
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		background: '#ddd',
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	active: {
		opacity: 1,
		color: 'black',
	},
	inactive: {
		opacity: 0.8,
	},
}));

const Copyright = () => {
	return (
		<>
			<Typography variant='body2' align='center'>
				<b>
					{'Copyright © '}
					<Link
						color='inherit'
						to='/'
						style={{ textDecoration: 'none', color: 'black' }}
					>
						Codinity
					</Link>{' '}
					{new Date().getFullYear()}
				</b>
			</Typography>
			<Typography variant='body2' align='center'>
				<b>All rights reserved.</b>
			</Typography>
		</>
	);
};

const list = [
	{
		name: 'Dashboard',
		link: '/dashboard',
		value: 0,
		icon: DashboardIcon,
	},
	{ name: 'Requests', link: '/requests', value: 1, icon: LayersIcon },
	{
		name: 'Earnings',
		link: '/earnings',
		value: 2,
		icon: AccountBalanceWalletSharpIcon,
	},
	{ name: 'Bugs', link: '/bugs', value: 3, icon: BugReportSharpIcon },
	{ name: 'Reports', link: '/reports', value: 4, icon: BarChartIcon },
];

const Controller = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [activeIndex, setActiveIndex] = useState(0);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component='h1'
						variant='h5'
						color='inherit'
						noWrap
						className={classes.title}
					>
						<b>Dashboard</b>
					</Typography>
					<IconButton color='inherit'>
						<Badge badgeContent={4} color='secondary'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!open && classes.drawerPaperClose
					),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<Typography
						variant='h4'
						noWrap
						component={Link}
						to='/'
						style={{
							paddingRight: 5,
							textDecoration: 'none',
							color: 'black',
						}}
					>
						Codinity
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					{list.map((item, index) => (
						<ListItem
							button
							selected={item.value === activeIndex}
							className={
								item.value === activeIndex
									? classes.active
									: classes.inactive
							}
							component={Link}
							to={'/admin' + item.link}
							onClick={() => {
								setActiveIndex(index);
							}}
						>
							<ListItemIcon>
								<item.icon
									style={{
										color:
											item.value === activeIndex
												? 'black'
												: 'inherit',
									}}
								/>
							</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>{secondaryListItems}</List>
				<Divider />
				<Box
					pt={4}
					style={{ marginTop: 'auto', opacity: 0.5, padding: 20 }}
				>
					<Copyright />
				</Box>
			</Drawer>
		</>
	);
};

export default Controller;
