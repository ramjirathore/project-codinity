import React from 'react';
import {
	Grid,
	makeStyles,
	Paper,
	Divider,
	Tab,
	Tabs,
	Box,
	AppBar,
} from '@material-ui/core';
import ReactPlayer from 'react-player/lazy';

import SmallCard from './SmallCard/SmallCard.component';

const useStyles = makeStyles((theme) => ({
	sideContainer: {
		flex: 0.25,
		height: '100vh',
	},
	main: {
		flex: 0.75,
		background: theme.palette.common.grey,
	},
	recomnd: {
		height: '100%',
		background: theme.palette.common.black,
		color: 'white',
		borderLeft: '1px solid lightgray',
	},
	recomndHead: {
		fontSize: '1.5em',
		padding: 10,
		fontFamily: 'Raleway',
	},
	videos: {
		maxHeight: '95vh',
		overflowY: 'scroll',
		flex: 1,
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const videos = [
	{ path: 'https://www.youtube.com/embed/6ZfuNTqbHE8' },
	{ path: 'https://www.youtube.com/embed/EXeTwQWrcwY' },
	{ path: 'https://www.youtube.com/embed/5iaYLCiq5RM' },
	{ path: 'https://www.youtube.com/embed/zSWdZVtXT7E' },
	{ path: 'https://www.youtube.com/embed/sutgWjz10sM' },
	{ path: 'https://www.youtube.com/embed/XiHiW4N7-bo' },
];

const VideoPage = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const id = window.location.pathname.split('/')[2];

	const tabsSection = (
		<React.Fragment>
			<AppBar position='static'>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='video tabs'
				>
					<Tab label='Description' {...a11yProps(0)} />
					<Tab label='Q & A' {...a11yProps(1)} />
					<Tab label='Notes' {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
		</React.Fragment>
	);

	return (
		<Grid container>
			<Grid item className={classes.main}>
				<Grid container direction='column'>
					<Grid item>
						<Paper square style={{ height: '75vh' }}>
							<ReactPlayer
								controls
								width='75vw'
								height='75vh'
								url={`https://www.youtube.com/watch?v=${id}`}
							/>
						</Paper>
					</Grid>
					<Grid item style={{ height: '25vh' }}>
						{tabsSection}
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.sideContainer}>
				<Paper className={classes.recomnd} elevation={6} square>
					<div className={classes.recomndHead}>RECOMMENDED</div>
					<Divider style={{ background: 'lightgray' }} />
					<div className={classes.videos}>
						{videos.map(() => (
							<SmallCard />
						))}
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default VideoPage;
