import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	nav: {
		background: theme.palette.common.grey
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	search: {
		marginLeft: 'auto',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch'
			}
		}
	},
	options: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	opt: {
		...theme.typography.tab,
		fontSize: '1.3em',
		fontFamily: 'Roboto',
		textTransform: 'uppercase'
	},
	toolbar: {
		...theme.mixins.toolbar
	}
}));

const routes = [
	{ name: 'Home', link: '/' },
	{ name: 'Categories', link: '/categories' },
	{ name: 'Practice', link: '/practice' },
	{ name: 'About', link: '/about' }
];

export const Header = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	return (
		<>
			<AppBar position="fixed" className={classes.nav}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h4" noWrap>
						Codinity
					</Typography>
					<div className={classes.options}>
						<Tabs
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
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar} />
		</>
	);
};

export default Header;
