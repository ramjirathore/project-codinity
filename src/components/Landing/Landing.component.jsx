import React from 'react';
import {
	useTheme,
	Grid,
	Card,
	CardMedia,
	CardContent,
	makeStyles,
	CardActions,
	Button,
	Container,
	Typography
} from '@material-ui/core';

import datastructures from '../../assets/categoriesForeground/ds.jpg';
import algorithms from '../../assets/categoriesForeground/dsa3.jpg';
import cpp from '../../assets/categoriesForeground/cpp.png';
// import python from '../../assets/categoriesForeground/python.jpg';
// import java from '../../assets/categoriesForeground/java.png';
import nodejs from '../../assets/categoriesForeground/nodejs.jpg';
import react from '../../assets/categoriesForeground/reactjs.png';
import problemSolving from '../../assets/categoriesForeground/Problem_solving.png';
import angular from '../../assets/categoriesForeground/Angular-illustrations.jpg';
import vue from '../../assets/categoriesForeground/vuejs.png';

const cards = [
	{ field: 'Problem Solving', imgSrc: problemSolving },
	{ field: 'Data Structures', imgSrc: datastructures },
	{ field: 'Algorithms', imgSrc: algorithms },
	{ field: 'C++', imgSrc: cpp },
	{ field: 'ReactJS', imgSrc: react },
	{ field: 'AngularJS', imgSrc: angular },
	{ field: 'VueJS', imgSrc: vue },
	{ field: 'NodeJS', imgSrc: nodejs }
	// { field: 'Python', imgSrc: python },
	// { field: 'JAVA', imgSrc: java }
];

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: '#eee',
		padding: theme.spacing(6, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	head: {
		fontWeight: 600,
		fontSize: '2.3em',
		paddingBottom: theme.spacing(1)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		background: theme.palette.common.grey
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1,
		color: theme.palette.common.white
	}
}));

const Landing = () => {
	const theme = useTheme();
	const classes = useStyles();
	return (
		<div
			style={{
				background: theme.palette.common.black,
				color: 'white'
			}}
		>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						What is Codinity?
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						A platform which connects students to students. Create the content,
						spread your knowledge, learn, apply and a lot more..
					</Typography>
					<div className={classes.heroButtons}>
						<Grid container spacing={2} justify="center">
							<Grid item>
								<Button variant="contained" color="primary">
									GETTING STARTED
								</Button>
							</Grid>
							<Grid item>
								<Button variant="outlined" color="primary">
									FIND YOUR DOMAIN
								</Button>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
			{/* End hero unit */}
			<Container className={classes.cardGrid} maxWidth="lg">
				<Typography className={classes.head}>Popular Categories</Typography>
				<hr style={{ marginBottom: 40 }} />
				<Grid container spacing={4}>
					{cards.map((card, index) => (
						<Grid item key={index} xs={12} sm={6} md={4}>
							<Card className={classes.card} elevation={4}>
								<CardMedia
									className={classes.cardMedia}
									image={card.imgSrc}
									title="Image title"
								/>
								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant="b" component="h2">
										{card.field}
									</Typography>
									<Typography>
										This is a media card which will have readme introduction or
										something like that..
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small" variant="contained" color="primary">
										Practice
									</Button>
									<Button size="small" variant="contained" color="primary">
										Explore
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default Landing;
