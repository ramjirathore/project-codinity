import React from 'react';
import {
	useTheme,
	makeStyles,
	Grid,
	Button,
	Typography,
	useMediaQuery,
	Card,
	CardContent,
	Container,
} from '@material-ui/core';

import arrow from '../../assets/forwardArrow.svg';
import customSoftwareIcon from '../../assets/Custom Software Icon.svg';
import mobileAppIcon from '../../assets/mobileIcon.svg';
import websiteIcon from '../../assets/websiteIcon.svg';
import revolutionBackground from '../../assets/repeatingBackground.svg';
import infoBackground from '../../assets/infoBackground.svg';
import CallToAction from '../UI/CallToAction/CallToAction';

import back from '../../assets/log/dark2.jpg';
import start from '../../assets/log/shade.jpg';

const useStyles = makeStyles((theme) => ({
	background: {
		backgroundImage: `url(${back})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		height: '60em',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			backgroundAttachment: 'inherit',
		},
	},
	heroTextContainer: {
		flex: 1,
		color: 'lightgray',
		minWidth: '21.5em',
		marginLeft: '1em',
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0,
		},
	},
	buttonContainer: {
		marginTop: '1em',
	},
	estimateButton: {
		color: 'lightgray',
		backgroundColor: '#05368B',
		borderRadius: 50,
		height: 45,
		width: 200,
		marginRight: 40,
		'&:hover': {
			backgroundColor: '#000',
		},
	},
	learnButtonHero: {
		...theme.typography.learnButton,
		fontSize: '0.9rem',
		height: 45,
		width: 200,
	},
	learnButton: {
		...theme.typography.learnButton,
		fontSize: '.7rem',
		height: 35,
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			marginBottom: '2em',
		},
	},
	intro: {
		backgroundColor: '#c5c6c7',
		padding: theme.spacing(6, 0, 6),
	},
	information: {
		backgroundImage: `url(${start})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		// height: '100%',
		width: '100%',
		backgroundAttachment: 'fixed',
		// height: '80em',
	},
	specialText: {
		fontFamily: 'Pacifico',
		color: theme.palette.common.orange,
	},
	subtitle: {
		marginBottom: '1em',
	},
	icon: {
		marginLeft: '2em',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	iconApp: {
		marginRight: '5em',
		marginLeft: '2em',
		[theme.breakpoints.down('sm')]: {
			marginRight: 0,
			marginLeft: 0,
		},
	},
	serviceContainer: {
		minHeight: '100vh',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			padding: 25,
			marginTop: '5em',
		},
	},
	sericesItem: {
		marginLeft: '5em',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
			textAlign: 'center',
		},
	},
	revolutionContainer: {
		height: '100em',
		marginTop: '12em',
		[theme.breakpoints.down('sm')]: {
			height: '90em',
		},
	},
	revolutionBody: {
		textAlign: 'center',
	},
	revolutionBack: {
		backgroundImage: `url(${revolutionBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100%',
		width: '100%',
	},
	revolutionCard: {
		position: 'absolute',
		boxShadow: theme.shadows[10],
		borderRadius: 15,
		padding: '10em',
		[theme.breakpoints.down('sm')]: {
			padding: '8em 0',
			borderRadius: 0,
			width: '100%',
		},
	},
	info: {
		color: 'white',
	},
	infoContainer: {
		height: '80em',
		[theme.breakpoints.down('sm')]: {
			height: '70em',
		},
	},
	infoBack: {
		backgroundImage: `url(${infoBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100%',
		width: '100%',
	},
	learnInfoButton: {
		...theme.typography.learnButton,
		borderColor: 'white',
		color: 'white',
		fontSize: '.7rem',
		height: 35,
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			marginBottom: '2em',
		},
	},
	arrowInfo: {
		...theme.typography.arrow,
		fill: 'white',
	},
}));

const Landing = () => {
	const theme = useTheme();
	const classes = useStyles();

	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Grid container direction='column'>
			<Grid item>
				{/*-----Hero Block-----*/}
				<Grid
					container
					justify='center'
					alignItems='center'
					direction='row'
					className={classes.background}
				>
					<Grid className={classes.heroTextContainer} sm item>
						<Typography variant='h3' align='center'>
							Connecting Student to Student and
							<br /> bringing the Programmers Community together.
						</Typography>
						<Grid
							className={classes.buttonContainer}
							container
							justify='center'
						>
							<Grid item>
								<Button
									className={classes.estimateButton}
									variant='contained'
								>
									Explore Categories
								</Button>
							</Grid>
							<Grid item>
								<Button
									className={classes.learnButtonHero}
									variant='outlined'
								>
									Start Practice
									<img
										style={{ color: 'white', padding: 5 }}
										src={arrow}
										alt='arrow icon'
									/>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.information}>
				{/*-----Services Block-----*/}
				<Grid
					container
					direction='row'
					className={classes.serviceContainer}
					justify='flex-end'
				>
					<Grid item style={{ marginRight: 70 }}>
						<Container maxWidth='md'>
							<Typography
								component='h1'
								variant='h2'
								align='center'
								gutterBottom
								style={{
									color: '#FC4445',
									fontFamily: 'Roboto',
								}}
							>
								What is Codinity?
							</Typography>
							<Typography
								variant='h5'
								align='center'
								color='textSecondary'
								style={{ color: 'white', maxWidth: '30em' }}
							>
								A platform for college going students to explore
								and share their knowledge on various topics
								related to computer science through video
								lectures.
								<br />
								<br />
								We have seen that there is always a gap between
								the student who is learning and the instructor
								who is teaching.
								<br />
								To bridge that gap, why not let students take
								control?
							</Typography>
						</Container>
					</Grid>
				</Grid>
				{/*-----Website Block-----*/}
			</Grid>
			<Grid item>
				<Grid
					container
					className={classes.revolutionContainer}
					justify='center'
					alignItems='center'
				>
					<Card className={classes.revolutionCard}>
						<CardContent>
							<Grid
								container
								direction='column'
								className={classes.revolutionBody}
							>
								<Grid item>
									<Typography variant='h3' gutterBottom>
										The Revolution
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant='subtitle1'>
										Visionary insights coupled with
										cutting-edge technology is a recipe for
										revolution.
									</Typography>
									<Button
										variant='outlined'
										className={classes.learnButton}
									>
										Learn More
										<img
											className={classes.arrow}
											src={arrow}
											alt='arrow icon'
										/>
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
					<div className={classes.revolutionBack} />
				</Grid>
			</Grid>
			<Grid item>
				{/*-----Information Block-----*/}
				<Grid
					className={classes.infoContainer}
					container
					alignItems='center'
					direction='row'
				>
					<Grid
						item
						container
						style={{
							position: 'absolute',
							textAlign: matchesXS ? 'center' : 'inherit',
						}}
						direction={matchesXS ? 'column' : 'row'}
						// spacing={matchesXS ? 10 : 0}
					>
						<Grid
							style={{
								marginLeft: matchesXS
									? 0
									: matchesSM
									? '2em'
									: '5em',
								marginBottom: matchesXS ? theme.spacing(10) : 0,
							}}
							sm
							item
						>
							<Grid container direction='column'>
								<Typography
									className={classes.info}
									variant='h2'
								>
									About Us
								</Typography>
								<Typography variant='subtitle2'>
									Let's get personal
								</Typography>
								<Grid item>
									<Button
										variant='outlined'
										className={classes.learnInfoButton}
									>
										Learn More
										<img
											className={classes.arrowInfo}
											src={arrow}
											alt='arrow icon'
										/>
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							style={{
								marginRight: matchesXS
									? 0
									: matchesSM
									? '2em'
									: '5em',
								textAlign: matchesXS ? 'center' : 'right',
							}}
							sm
							item
						>
							<Grid container direction='column'>
								<Typography
									className={classes.info}
									variant='h2'
								>
									Contact Us
								</Typography>
								<Typography variant='subtitle2'>
									Say hello!
								</Typography>
								<Grid item>
									<Button
										variant='outlined'
										className={classes.learnInfoButton}
									>
										Learn More
										<img
											className={classes.arrowInfo}
											src={arrow}
											alt='arrow icon'
										/>
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<div className={classes.infoBack} />
				</Grid>
			</Grid>
			<Grid item>
				<CallToAction />
			</Grid>
		</Grid>
	);
};

export default Landing;
