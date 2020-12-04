import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	makeStyles,
	CssBaseline,
	Drawer,
	Box,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Badge,
	Container,
	Grid,
	Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
	mainListItems,
	secondaryListItems,
} from '../../components/AdminParts/ListItems.component';
import Deposits from '../../components/AdminParts/Deposits.component';
import Table from '../../components/AdminParts/Table.component';

const Copyright = () => {
	return (
		<Typography variant='body2' style={{ color: 'white' }} align='center'>
			{'Copyright © '}
			<Link
				color='inherit'
				to='/'
				style={{ textDecoration: 'none', color: 'white' }}
			>
				Codinity
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
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
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
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
	content: {
		background: theme.palette.common.black,
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(1),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		background: theme.palette.common.grey,
	},
	fixedHeight: {
		height: 220,
		color: 'white',
		background: theme.palette.common.grey,
		border: '1px solid',
	},
}));

const Dashboard = ({ categories, blogs }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const categoriesHeader = ['Category', 'Videos'];
	const allCategories = categories
		? categories.map((item) => ({ key: item.key, len: item.count }))
		: [];

	const totalBlogs = blogs.length();

	return (
		<div className={classes.root}>
			<CssBaseline />
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
						variant='h6'
						color='inherit'
						noWrap
						className={classes.title}
					>
						Dashboard
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
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='xl' className={classes.container}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant='outlined'
								style={{ borderColor: 'cyan' }}
								className={fixedHeightPaper}
							>
								<Deposits
									heading='Total Users'
									headColor='cyan'
									mainData='208'
									currentDate='1 December, 2020'
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant='outlined'
								style={{ borderColor: 'yellow' }}
								className={fixedHeightPaper}
							>
								<Deposits
									heading='Blogs Posted'
									headColor='yellow'
									mainData='10'
									currentDate='1 December, 2020'
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant='outlined'
								className={fixedHeightPaper}
								style={{ borderColor: 'lightgreen' }}
							>
								<Deposits
									heading='Total Users'
									mainData='21'
									headColor='lightgreen'
									currentDate='1 December, 2020'
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant='outlined'
								className={fixedHeightPaper}
							>
								<Deposits
									heading='Total Users'
									mainData='208'
									currentDate='1 December, 2020'
								/>
							</Paper>
						</Grid>

						{/* Recent Orders */}
						<Grid item xs={12} lg={4}>
							<Paper className={classes.paper}>
								<Table
									header={categoriesHeader}
									rows={allCategories}
								/>
							</Paper>
						</Grid>
						{/* <Grid item xs={12} lg={6}>
							<Paper className={classes.paper}>
								<Table />
							</Paper>
						</Grid> */}
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		categories: state.ctgr.categories,
		blogs: state.blg.blogs,
		loading: state.ctgr.loading || state.blg.loading,
	};
};

export default connect(mapStateToProps)(Dashboard);
