import React from 'react';
import {
	makeStyles,
	Card,
	CardContent,
	Typography,
	Grid,
	Tooltip
} from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';

import './searchpagecss.css';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		margin: '15px 0' /** Remove this margin.. just for better view here*/,
		backgroundColor: theme.palette.common.white,
		borderRadius: '5px',
		textAlign: 'Left',
		boxShadow: '2px 2px 10px rgb(204,204,204,0.8)',
		cursor: 'pointer',
		'&:hover': {
			boxShadow: '4px 8px 30px rgba(0, 0, 0, 0.15)'
		}
	},
	content: {
		padding: 0,
		maxWidth: '100%'
	},
	titleBar: {
		padding: 12,
		backgroundColor: `${theme.palette.common.lightblue}`,
		display: 'flex'
	},
	title: {
		fontSize: '1.2rem',
		textTransform: 'uppercase',
		fontWeight: 600,
		color: `${theme.palette.common.blue}`,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},
	item: {
		width: '100px'
	},
	courtDetail: {
		padding: 12,
		display: 'flex'
	},
	courtName: {
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		textTransform: 'uppercase',
		fontWeight: 600,
		display: 'flex',
		justifyContent: 'space-between',
		boxShadow: '2px 2px 2px rgb(204,204,204,0.8)'
	},
	description: {
		paddingLeft: 12,
		paddingRight: 12
	},
	pos: {
		marginBottom: 12,
		textTransform: 'capitalize'
	}
}));

const SearchCard = ({ data, isLoading, searchOn }) => {
	const classes = useStyles();
	// const handleNewPage = (docLMID) => {
	// 	window.open(`/judgement/${docLMID}`, '_blank');
	// };

	const dummyCards = Array.apply(null, Array(5)).map((data, index) => (
		<Card className={classes.root} key={index}>
			<CardContent className={classes.content}>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
					className={classes.titleBar}
				>
					<Typography
						className={classes.title}
						component="div"
						style={{ width: '50%' }}
					>
						<Skeleton aninmation="wave" />
					</Typography>
					<Typography
						className={classes.title}
						component="div"
						style={{ width: '10%' }}
					>
						<Skeleton aninmation="wave" />
					</Typography>
				</Grid>

				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
					className={classes.courtDetail}
				>
					<Typography
						className={classes.pos}
						component="div"
						style={{ width: '40%', height: '40%' }}
					>
						<Typography className={classes.courtName}>
							<Skeleton aninmation="wave" style={{ width: '100%' }} />
						</Typography>
					</Typography>
				</Grid>
				<Typography
					component="div"
					variant="caption"
					className={classes.description}
				>
					<Skeleton aninmation="wave" style={{ width: '100%' }} />
					<Skeleton aninmation="wave" style={{ width: '100%' }} />
					<Skeleton aninmation="wave" style={{ width: '100%' }} />
					<Skeleton aninmation="wave" style={{ width: '100%' }} />
				</Typography>
			</CardContent>
		</Card>
	));

	const formatDate = (date) => {
		let d = new Date(date);
		return d.toDateString();
	};
	let penalty = null;
	let isPA = null;
	let dataCards = '';
	if (data) {
		// console.log(data);
		dataCards = data.map(
			(doc, index) => (
				(isPA = doc.docPenaltyAmt != null),
				(
					// console.log(isPA),
					<Card
						key={doc.LMID + index}
						className={classes.root}
						onClick={() => window.open(`/judgement/${doc.docLMID}`, '_blank')}
					>
						<CardContent className={classes.content}>
							<Grid
								container
								wrap="nowrap"
								direction="row"
								justify="space-between"
								alignItems="center"
								className={classes.titleBar}
							>
								<Grid className={classes.item} item xs zeroMinWidth>
									<Tooltip title={doc.title}>
										<Typography
											className={classes.title}
											variant="h5"
											component="div"
											style={{ width: '90%' }}
										>
											{doc.title}
										</Typography>
									</Tooltip>
								</Grid>

								<Grid item>
									<Typography
										className={classes.title}
										variant="h5"
										component="h2"
									>
										{formatDate(doc.date)}
									</Typography>
								</Grid>
							</Grid>

							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
								className={classes.courtDetail}
							>
								<Typography className={classes.pos} component="div">
									<Typography className={classes.courtName}>
										{doc.heading}
									</Typography>
								</Typography>
								{isPA ? (
									<Typography className={classes.pos} component="div">
										<Typography className={classes.courtName}>
											Penalty Amount:{' '}
											{doc.docPenaltyAmt.toLocaleString('en-IN')}
										</Typography>
									</Typography>
								) : null}
								<Typography className={classes.pos} component="div">
									<Typography className={classes.courtName}>
										{doc.subheading}
									</Typography>
								</Typography>
							</Grid>

							<Typography letterSpacing={0} style={{ padding: 20 }}>
								{doc.HIGHLIGHTS}
							</Typography>
						</CardContent>
					</Card>
				)
			)
		);
	}

	return <React.Fragment>{isLoading ? dummyCards : null}</React.Fragment>;
};

export default SearchCard;
