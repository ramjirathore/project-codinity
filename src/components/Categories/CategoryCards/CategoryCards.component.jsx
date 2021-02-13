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

import { db } from '../../../config/fbConfig';

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

const CategoryCards = (props) => {
	const { imgSrc, field, history, tag, desc } = props;
	const classes = useStyles();
	return (
		<Card className={classes.card} elevation={4}>
			<CardMedia
				className={classes.cardMedia}
				image={imgSrc}
				title="Image title"
			/>
			<CardContent className={classes.cardContent}>
				<Typography gutterBottom variant="h6" component="h2">
					<b>{field}</b>
				</Typography>
				<Typography>{desc}</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					variant="contained"
					color="primary"
					onClick={() => {
						localStorage.setItem('tag', JSON.stringify({ tag }));
						history.push('/practice');
					}}
				>
					Practice
				</Button>
				<Button
					size="small"
					variant="contained"
					color="primary"
					onClick={() => {
						const docRef = db.ref(`docs/${tag}`);
						let url;
						docRef
							.once('value', (snapshot) => {
								url = snapshot.val();
							})
							.then(() => {
								if (url != null) window.open(url, '_blank');
							});
					}}
				>
					Explore
				</Button>
			</CardActions>
		</Card>
	);
};

export default CategoryCards;
