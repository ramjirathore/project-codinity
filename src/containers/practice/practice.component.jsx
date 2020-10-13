import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ds from '../../assets/icons/data.svg';
import algo from '../../assets/icons/algorithm.svg';
import react from '../../assets/icons/react.png';
import java from '../../assets/icons/java.svg';
import ml from '../../assets/icons/machine-learning.svg';
import javascript from '../../assets/icons/javascript.svg';
import php from '../../assets/icons/php-document.svg';
import nodejs from '../../assets/icons/nodejs.svg';
import cpp from '../../assets/icons/cpp.svg';
import SearchCard from '../../components/SearchCards/searchCard.component';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		background: theme.palette.common.grey
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3)
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	icon: {
		height: 28,
		width: 28
	}
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
	{ item: 'PHP', icon: php }
	// { item: 'Vue', icon: <ForumIcon /> },
];

const Practice = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h5" noWrap style={{ fontFamily: 'Roboto' }}>
						Practice
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
				anchor="left"
			>
				<div className={classes.toolbar}>
					<Typography className={classes.title} variant="h4" noWrap>
						Codinity
					</Typography>
				</div>
				<Divider />
				<List>
					{topicsList.map((topic, index) => (
						<ListItem button key={topic.item}>
							<ListItemIcon>
								<img
									src={topic.icon}
									className={classes.icon}
									alt="data-structure"
								/>
							</ListItemIcon>
							<ListItemText primary={topic.item} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main className={classes.content}>
				<SearchCard data={null} isLoading={true} searchOn={true} />
			</main>
		</div>
	);
};

export default Practice;
