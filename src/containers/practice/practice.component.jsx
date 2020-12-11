import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	makeStyles,
	Drawer,
	CssBaseline,
	Typography,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

import ds from '../../assets/icons/data.svg';
import algo from '../../assets/icons/algorithm.svg';
import react from '../../assets/icons/react.png';
import java from '../../assets/icons/java.svg';
import ml from '../../assets/icons/machine-learning.svg';
import javascript from '../../assets/icons/javascript.svg';
import php from '../../assets/icons/php-document.svg';
import nodejs from '../../assets/icons/nodejs.svg';
import problemSolving from '../../assets/icons/problem-solving.svg';
import cpp from '../../assets/icons/cpp.svg';
import angular from '../../assets/icons/angular.svg';
import vue from '../../assets/icons/vue.png';
import python from '../../assets/icons/python.png';
import VidCard from '../../components/Card/Card.component';

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
	item: {
		...theme.typography.tab,
		opacity: 0.6,
		color: 'white',
	},
	selectedItem: {
		opacity: 1,
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
	{
		item: 'Data Structures',
		icon: ds,
		tag: 'dataStructure',
	},
	{ item: 'Algorithms', icon: algo, tag: 'algorithms' },
	{
		item: 'Problem Solving',
		icon: problemSolving,
		tag: 'problemSolving',
	},
	{ item: 'C++', icon: cpp, tag: 'cpp' },
	{ item: 'Python', icon: python, tag: 'python' },
	{ item: 'Machine Learning', icon: ml, tag: 'machineLearning' },
	{ item: 'Javascript', icon: javascript, tag: 'javascript' },
	{ item: 'ReactJS', icon: react, tag: 'reactJS' },
	{ item: 'NodeJS', icon: nodejs, tag: 'nodeJS' },
	{ item: 'AngularJS', icon: angular, tag: 'angularJS' },
	{ item: 'JAVA', icon: java, tag: 'java' },
	{ item: 'PHP', icon: php, tag: 'pho' },
	{ item: 'VueJS', icon: vue, tag: 'vueJS' },
];

const Practice = (props) => {
	const { categories, loading } = props;
	const initialState = JSON.parse(localStorage.getItem('tag'));
	console.log(initialState);
	const classes = useStyles();
	const [selectedCatg, setSelectedCatg] = useState(initialState);

	let catg = [];
	if (!loading) {
		let videos = categories.get(selectedCatg.tag);
		if (videos) {
			for (let [, video] of Object.entries(videos)) {
				// console.log(video);
				catg.push(video);
			}
		}
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'
			>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					{topicsList.map((topic, index) => (
						<ListItem
							button
							key={topic.item}
							onClick={() => {
								localStorage.setItem(
									'tag',
									JSON.stringify({ tag: topic.tag })
								);
								setSelectedCatg({ tag: topic.tag });
							}}
							selected={selectedCatg.tag === topic.tag}
						>
							<ListItemIcon>
								<img
									src={topic.icon}
									className={classes.icon}
									alt='data-structure'
								/>
							</ListItemIcon>
							<ListItemText
								className={
									selectedCatg.tag === topic.tag
										? [
												classes.item,
												classes.selectedItem,
										  ].join(' ')
										: classes.item
								}
							>
								{selectedCatg.tag === topic.tag ? (
									<b>{topic.item}</b>
								) : (
									topic.item
								)}
							</ListItemText>
						</ListItem>
					))}
				</List>
			</Drawer>
			<main className={classes.content}>
				{/* <SearchCard data={null} isLoading={true} searchOn={true} /> */}
				{catg.length ? (
					<Grid container spacing={2}>
						{catg.map((video, index) => (
							<Grid item lg={2} key={index}>
								<VidCard {...video} loading={loading} />
							</Grid>
						))}
					</Grid>
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							color: 'white',
							alignItems: 'center',
							height: '80vh',
						}}
					>
						<Typography variant='h5'>No videos yet :(</Typography>
					</div>
				)}
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
