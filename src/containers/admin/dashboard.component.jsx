import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles, Grid, Paper } from '@material-ui/core';

import DataCard from '../../components/AdminParts/DataCard.component';
import Table from '../../components/AdminParts/Table.component';

import { db } from '../../config/fbConfig';

const useStyles = makeStyles((theme) => ({
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
	loading: {
		display: 'flex',
		height: '80vh',
		color: 'white',
		fontSize: '2rem',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const Dashboard = ({ categories, blogs, loading }) => {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const [events, setEvents] = useState(0);
	const [blogCount, setBlogsCount] = useState(0);

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const categoriesHeader = ['Category', 'Videos'];

	useEffect(() => {
		const usersRef = db.ref().child('users');
		usersRef
			.once('value', (snapshot) => {
				let allUsers = [];
				snapshot.forEach((childSnapshot) => {
					allUsers.push({
						key: childSnapshot.key,
						name: childSnapshot.val().name,
						email: childSnapshot.val().email,
					});
					setUsers([...allUsers]);
				});
			})
			.catch((err) => {});

		axios
			.get('https://codinity-6ab53.firebaseio.com/events.json')
			.then((response) => {
				setEvents(Object.keys(response.data).length);
			});
		axios
			.get('https://codinity-6ab53.firebaseio.com/blogs.json')
			.then((response) => {
				setBlogsCount(Object.keys(response.data).length);
			});
	}, []);

	let allCategories = [];
	let totalVideos = 0;
	if (!loading) {
		for (let [key, video] of categories) {
			const len = Object.keys(video).length;

			allCategories.push({ key, len });
			totalVideos += len;
		}
	}

	const getCurrentDate = () => {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();

		today = dd + '/' + mm + '/' + yyyy;
		return today;
	};

	return (
		<>
			{!loading ? (
				<>
					<Grid container spacing={4}>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant="outlined"
								style={{ borderColor: 'cyan' }}
								className={fixedHeightPaper}
							>
								<DataCard
									heading="Total Users"
									headColor="cyan"
									mainData={users.length}
									currentDate={getCurrentDate()}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant="outlined"
								style={{ borderColor: 'yellow' }}
								className={fixedHeightPaper}
							>
								<DataCard
									heading="Blogs Posted"
									headColor="yellow"
									mainData={blogCount}
									currentDate={getCurrentDate()}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant="outlined"
								className={fixedHeightPaper}
								style={{ borderColor: 'lightgreen' }}
							>
								<DataCard
									heading="Events Scheduled"
									mainData={events}
									headColor="lightgreen"
									currentDate={getCurrentDate()}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant="outlined"
								className={fixedHeightPaper}
								style={{ borderColor: 'orange' }}
							>
								<DataCard
									heading="Total Videos"
									mainData={totalVideos}
									headColor="orange"
									currentDate={getCurrentDate()}
								/>
							</Paper>
						</Grid>

						<Grid item xs={12} lg={8}>
							<Paper className={classes.paper}>
								<Table
									header={['Token', 'UserName', 'Email']}
									rows={users}
									color="purple"
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Paper className={classes.paper}>
								<Table
									header={categoriesHeader}
									rows={allCategories}
									color="red"
								/>
							</Paper>
						</Grid>
					</Grid>
				</>
			) : (
				<div className={classes.loading}>Loading...</div>
			)}
		</>
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
