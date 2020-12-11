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
	Typography,
} from '@material-ui/core';
import ReactPlayer from 'react-player/lazy';
import { connect } from 'react-redux';

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
		// borderLeft: '1px solid lightgray',
	},
	recomndHead: {
		fontSize: '1.5em',
		padding: 10,
		fontFamily: 'Raleway',
	},
	videos: {
		maxHeight: '100%',
		// overflowY: 'scroll',
		flex: 1,
	},
	desc: {
		color: 'white',
		fontSize: '1em',
		fontFamily: 'Roboto',
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

const VideoPage = (props) => {
	const { categories, loading } = props;
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const video = JSON.parse(localStorage.getItem('currentVid'));

	let recommend = [];
	if (!loading) {
		let videos = categories.get(video.tag);
		if (videos) {
			for (let [key, value] of Object.entries(videos)) {
				if (key !== video.videoId) {
					recommend.push({ key, value });
				}
			}
		}
		// console.log(recommend);
	}
	// console.log(video);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabsSection = (
		<React.Fragment>
			<AppBar position='static'>
				<div style={{ display: 'flex' }}>
					<div
						style={{
							padding: '0 20px',
							display: 'flex',
							color: 'lightgray',
							alignItems: 'center',
						}}
					>
						<Typography style={{ marginRight: 20 }}>
							<b>Creator: {video.name}</b>
						</Typography>
						<Typography>
							<b>Viewed by: {video.views}</b>
						</Typography>
					</div>
					<Tabs
						style={{ marginLeft: 'auto' }}
						value={value}
						onChange={handleChange}
						aria-label='video tabs'
					>
						<Tab label='Description' {...a11yProps(0)} />
						<Tab label='Q & A' {...a11yProps(1)} />
						<Tab label='Notes' {...a11yProps(2)} />
					</Tabs>
				</div>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Typography className={classes.desc}>
					{video.description}
				</Typography>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Typography variant='h6' style={{ color: 'white' }}>
					Coming Soon!
				</Typography>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Typography variant='h6' style={{ color: 'white' }}>
					Coming Soon!
				</Typography>
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
								url={video.url}
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
						{recommend.length > 0 ? (
							recommend.map((video, index) => (
								<SmallCard
									key={index}
									{...video.value}
									videoId={video.key}
									history={props.history}
									reFetchCategories={props.InitCategories}
								/>
							))
						) : (
							<Typography
								variant='h6'
								style={{
									height: '10em',
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								Nothing here :(
							</Typography>
						)}
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		categories: state.ctgr.categories,
		error: state.ctgr.error,
		loading: state.ctgr.loading,
	};
};

export default connect(mapStateToProps)(VideoPage);
