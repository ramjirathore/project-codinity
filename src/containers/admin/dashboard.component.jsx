import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, Grid, Paper } from '@material-ui/core';

import DataCard from '../../components/AdminParts/DataCard.component';
import Table from '../../components/AdminParts/Table.component';

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

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const categoriesHeader = ['Category', 'Videos'];
	const allCategories = categories
		? categories.map((item) => ({ key: item.key, len: item.count }))
		: [];

	return (
		<>
			{!loading ? (
				<>
					<Grid container spacing={4}>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant='outlined'
								style={{ borderColor: 'cyan' }}
								className={fixedHeightPaper}
							>
								<DataCard
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
								<DataCard
									heading='Blogs Posted'
									headColor='yellow'
									mainData={blogs.length}
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
								<DataCard
									heading='Events Scheduled'
									mainData='20'
									headColor='lightgreen'
									currentDate='1 December, 2020'
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper
								variant='outlined'
								className={fixedHeightPaper}
								style={{ borderColor: 'orange' }}
							>
								<DataCard
									heading='Total Videos'
									mainData='208'
									headColor='orange'
									currentDate='1 December, 2020'
								/>
							</Paper>
						</Grid>

						{/* Recent Orders */}
						<Grid item xs={12} lg={6}>
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
