import React from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	makeStyles,
	CardActions,
	Button,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		background: theme.palette.common.grey,
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
		color: theme.palette.common.white,
	},
}));

const CategoryCards = ({ imgSrc, field }) => {
	const classes = useStyles();
	return (
		<Card className={classes.card} elevation={4}>
			<CardMedia
				className={classes.cardMedia}
				image={imgSrc}
				title='Image title'
			/>
			<CardContent className={classes.cardContent}>
				<Typography gutterBottom variant='h6' component='h2'>
					<b>{field}</b>
				</Typography>
				<Typography>
					This is a media card which will have readme introduction or
					something like that..
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small' variant='contained' color='primary'>
					Practice
				</Button>
				<Button size='small' variant='contained' color='primary'>
					Explore
				</Button>
			</CardActions>
		</Card>
	);
};

export default CategoryCards;
