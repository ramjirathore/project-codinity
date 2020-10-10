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

const cards = [1, 2, 3, 4, 5, 6];

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
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1
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
			<Container className={classes.cardGrid} maxWidth="lg">
				{/* End hero unit */}
				<Grid container spacing={4}>
					{cards.map((card) => (
						<Grid item key={card} xs={12} sm={6} md={4}>
							<Card className={classes.card}>
								<CardMedia
									className={classes.cardMedia}
									image="https://source.unsplash.com/random"
									title="Image title"
								/>
								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant="h5" component="h2">
										Field Name
									</Typography>
									<Typography>
										This is a media card which will have readme introduction or
										something like that..
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small" color="primary">
										Practice
									</Button>
									<Button size="small" color="primary">
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
