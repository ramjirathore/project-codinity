import React from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	// Button,
	makeStyles,
	Drawer,
	CssBaseline,
	// AppBar,
	// Toolbar,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

// import { Link } from 'react-router-dom';

import ds from '../../assets/icons/data.svg';
import algo from '../../assets/icons/algorithm.svg';
import react from '../../assets/icons/react.png';
import java from '../../assets/icons/java.svg';
import ml from '../../assets/icons/machine-learning.svg';
import javascript from '../../assets/icons/javascript.svg';
import php from '../../assets/icons/php-document.svg';
import nodejs from '../../assets/icons/nodejs.svg';
import cpp from '../../assets/icons/cpp.svg';
import SearchCard from '../../components/Card/Card.component';
// import SearchCard from '../../components/SearchCards/searchCard.component';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		background: theme.palette.common.grey,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		color: 'white',
		zIndex: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		background: theme.palette.common.grey,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.black,
		padding: theme.spacing(3),
		minHeight: '93.5vh',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		color: 'white',
		textDecoration: 'none',
	},
	icon: {
		height: 28,
		width: 28,
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
}));

const topicsList = [
	{ item: 'Data Structures', icon: ds },
	{ item: 'Algorithms', icon: algo },
	{ item: 'C++', icon: cpp },
	{ item: 'Machine Learning', icon: ml },
	{ item: 'Javascript', icon: javascript },
	{ item: 'React', icon: react },
	{ item: 'NodeJS', icon: nodejs },
	// { item: 'Angular', icon: <GraphicEqIcon /> },
	{ item: 'JAVA', icon: java },
	{ item: 'PHP', icon: php },
	// { item: 'Vue', icon: <ForumIcon /> },
];

const Practice = ({ categories, loading }) => {
	// const path = 'https://www.youtube.com/embed/';

	const classes = useStyles();

	let catg = [];
	let videos = categories.get('algorithms');
	for (let [, video] of Object.entries(videos)) {
		// console.log(video);
		catg.push(video);
	}
	console.log(catg);

	// console.log(categories[1], loading);
	return (
		<div className={classes.root}>
			<CssBaseline />
			{/* <AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Typography
						variant='h5'
						noWrap
						style={{ fontFamily: 'Roboto' }}
					>
						Practice
					</Typography>
					<Button
						variant='contained'
						color='primary'
						style={{ marginLeft: 'auto', color: 'white' }}
					>
						<Link
							to='/video/test'
							style={{
								textDecoration: 'none',
								color: 'white',
							}}
						>
							Video Page
						</Link>
					</Button>
				</Toolbar>
			</AppBar> */}
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'
			>
				<div className={classes.toolbar} />

				{/* <div className={classes.toolbar}>
					<Typography
						className={classes.title}
						variant='h4'
						noWrap
						component={Link}
						to='/'
					>
						Codinity
					</Typography>
				</div> */}
				<Divider />
				<List>
					{topicsList.map((topic, index) => (
						<ListItem button key={topic.item}>
							<ListItemIcon>
								<img
									src={topic.icon}
									className={classes.icon}
									alt='data-structure'
								/>
							</ListItemIcon>
							<ListItemText style={{ color: 'lightgray' }}>
								{topic.item}
							</ListItemText>
						</ListItem>
					))}
				</List>
			</Drawer>
			<main className={classes.content}>
				{/* <SearchCard data={null} isLoading={true} searchOn={true} /> */}
				<Grid container spacing={2}>
					{catg.map((video, index) => (
						<Grid item lg={2} key={index}>
							<SearchCard {...video} loading={loading} />
						</Grid>
					))}
					{console.log(categories)}
				</Grid>
			</main>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		categories: state.ctgr.categories,
		error: state.ctgr.error,
		loading: state.ctgr.loading,
	};
};

export default connect(mapStateToProps)(Practice);
