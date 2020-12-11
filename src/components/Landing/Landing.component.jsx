import React from 'react';
import {
	useTheme,
	Grid,
	makeStyles,
	Button,
	Container,
	Typography,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import CategoriesCard from '../Categories/CategoryCards/CategoryCards.component';
import { categoriesList } from '../../components/Categories/categorieslist';

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: '#eee',
		padding: theme.spacing(6, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	head: {
		fontWeight: 600,
		fontSize: '2.3em',
		paddingBottom: theme.spacing(1),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
}));

const Landing = (props) => {
	const theme = useTheme();
	const classes = useStyles();

	return (
		<div
			style={{
				background: theme.palette.common.black,
				color: 'white',
			}}
		>
			<div className={classes.heroContent}>
				<Container maxWidth='sm'>
					<Typography
						component='h1'
						variant='h2'
						align='center'
						color='textPrimary'
						gutterBottom
					>
						What is Codinity?
					</Typography>
					<Typography
						variant='h5'
						align='center'
						color='textSecondary'
						paragraph
					>
						A platform which connects students to students. Create
						the content, spread your knowledge, learn, apply and a
						lot more..
					</Typography>
					<div className={classes.heroButtons}>
						<Grid container spacing={2} justify='center'>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									component={Link}
									to='/about'
								>
									GETTING STARTED
								</Button>
							</Grid>
							<Grid item>
								<Button variant='outlined' color='primary'>
									BECOME CREATOR
								</Button>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
			{/* End hero unit */}
			<Container className={classes.cardGrid} maxWidth='lg'>
				<Typography className={classes.head}>
					Popular Categories
				</Typography>
				<hr style={{ marginBottom: 40 }} />
				<Grid container spacing={4}>
					{categoriesList.slice(0, 6).map((card, index) => (
						<Grid item key={index} xs={12} sm={6} md={4}>
							<CategoriesCard
								imgSrc={card.imgSrc}
								field={card.field}
								tag={card.tag}
								history={props.history}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default Landing;
