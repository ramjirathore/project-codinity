import React from 'react';
import {
	Container,
	Grid,
	Typography,
	Paper,
	makeStyles,
} from '@material-ui/core';

import back from '../../assets/categoriesForeground/catg3.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.common.black,
		height: '100vh',
	},
	Header: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	HeaderContent: {
		position: 'relative',
		textAlign: 'center',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
}));
const post = {
	image: back,
	imgText: 'main image description',
};

const Categories = () => {
	const classes = useStyles();
	// const { post } = props;

	return (
		<Container maxWidth='xl' className={classes.root}>
			<Paper
				className={classes.Header}
				style={{ backgroundImage: `url(${post.image})` }}
			>
				{/* Increase the priority of the hero background image */}
				{
					<img
						style={{ display: 'none' }}
						src={post.image}
						alt={post.imageText}
					/>
				}
				<div className={classes.overlay} />
				<Grid container>
					<Grid item md={12}>
						<div className={classes.HeaderContent}>
							<Typography
								component='h1'
								variant='h2'
								color='inherit'
								gutterBottom
								elevation={10}
								style={{ fontWeight: 600 }}
							>
								CATEGORIES
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Categories;
