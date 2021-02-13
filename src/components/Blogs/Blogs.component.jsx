import React, { useState } from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import BlogsCard from './BlogsCard.component';
import axios from 'axios';
import blogImage from '../../assets/log/blog.jpg';

const useStyles = makeStyles((theme) => ({
	back: {
		backgroundImage: `url(${blogImage})`,
		color: theme.palette.common.white,
		padding: 30,
		minHeight: '100vh',
	},
}));

const Event = () => {
	const classes = useStyles();
	const [blogs, setBlogs] = useState({ blog: [], loading: true });
	if (blogs.loading) {
		axios
			.get('https://codinity-6ab53.firebaseio.com/blogs.json')
			.then((response) => {
				let blg = [];
				for (let [, value] of Object.entries(response.data)) {
					blg.push(value);
				}
				setBlogs({ blog: blg, loading: false });
			});
	}

	return (
		<div className={classes.back}>
			<Container maxWidth="lg">
				<Grid container>
					<Grid item md={12}>
						<div className={classes.HeaderContent}>
							<Typography
								component="h1"
								variant="h2"
								color="inherit"
								gutterBottom
								elevation={10}
								style={{ fontWeight: 600 }}
							>
								BLOGS
							</Typography>
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={4}>
					{!blogs.loading
						? blogs.blog.map((card, index) => (
								<Grid
									item
									key={index}
									xs={12}
									sm={6}
									md={6}
									lg={12}
								>
									<BlogsCard {...card} />
								</Grid>
						  ))
						: null}
				</Grid>
			</Container>
		</div>
	);
};

export default Event;
