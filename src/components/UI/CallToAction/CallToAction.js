import React from 'react';

import {
	Grid,
	Typography,
	Button,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import arrow from '../../../assets/forwardArrow.svg';
import background from '../../../assets/background.jpg';
import mobileBackground from '../../../assets/mobileBackground.jpg';

const useStyles = makeStyles((theme) => ({
	learnButton: {
		...theme.typography.learnButton,
		fontSize: '.7rem',
		height: 35,
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			marginBottom: '2em',
		},
	},
	arrow: {
		...theme.typography.arrow,
	},
	background: {
		backgroundImage: `url(${background})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		height: '60em',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			backgroundImage: `url(${mobileBackground})`,
			backgroundAttachment: 'inherit',
		},
	},
	estimateButton: {
		...theme.typography.estimate,
		borderRadius: 50,
		height: 80,
		// width: 205,
		backgroundColor: theme.palette.common.orange,
		fontSize: '1.5rem',
		marginRight: '5em',
		marginLeft: '2em',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
			marginRight: 0,
		},
	},
}));

const CallToAction = () => {
	const classes = useStyles();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			className={classes.background}
			direction={matchesSM ? 'column' : 'row'}
			alignItems='center'
			justify={matchesSM ? 'center' : 'space-between'}
		>
			<Grid
				style={{
					marginLeft: matchesSM ? 0 : '5em',
					textAlign: matchesSM ? 'center' : 'inherit',
				}}
				item
			>
				<Grid container direction='column'>
					<Grid item>
						<Typography
							variant='h2'
							style={{
								fontSize: matchesSM ? '2.3rem' : 'inherit',
							}}
						>
							Simple Software.
							<br />
							Revolutionary Results.
						</Typography>
						<Typography
							variant='subtitle2'
							style={{ fontSize: '1.5rem' }}
						>
							Take advantage of the 21st Century.
						</Typography>
						<Grid
							container
							justify={matchesSM ? 'center' : undefined}
						>
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
				</Grid>
			</Grid>
			<Grid item>
				<Button className={classes.estimateButton} variant='contained'>
					Explore Categories
				</Button>
			</Grid>
		</Grid>
	);
};

export default CallToAction;
