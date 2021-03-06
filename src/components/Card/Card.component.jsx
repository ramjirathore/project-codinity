import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import ReactPlayer from 'react-player/lazy';
import { deepPurple } from '@material-ui/core/colors';
import * as actions from '../../store/actions/index';

// import { Player } from 'video-react';

import { db } from '../../config/fbConfig';
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: '25em',
		minWidth: '20em',
		margin: theme.spacing(2),
		background: '#303030',
		color: 'white',
		'&:hover': {
			cursor: 'pointer',
			boxShadow:
				'0 10px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		},
	},
	media: {
		height: 150,
	},
	cover: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	playIcon: {
		position: 'absolute',
		height: 58,
		width: 58,
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	title: {
		color: 'white',
		fontFamily: 'roboto',
		fontSize: '1.2em',
		width: 225,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
}));

const VideoCard = (props) => {
	const classes = useStyles();
	const {
		name,
		title,
		loading,
		url,
		views,
		tag,
		uploadedOn,
		description,
		InitCategories,
	} = props;

	const extractToken = (url) => {
		let pos = url.indexOf('token');
		let res = url.substring(pos + 6);
		return res;
	};

	const { currentUser } = useAuth();

	const increaseViews = (props) => {

		const videoId = extractToken(url);

		if (currentUser === null) {
			InitCategories();
			localStorage.setItem(
				'currentVid',
				JSON.stringify({
					url,
					views,
					title,
					name,
					tag,
					description,
					videoId,
				})
			);
			const path = window.location.origin + '/video/' + videoId;
			window.open(path, '_blank');

			return;
		}

		const videoRef = db.ref(`categories/${tag}/${videoId}`);

		let video;
		videoRef
			.once('value', (snapshot) => {
				video = snapshot.val();
			})
			.then(() => {
				videoRef.set({
					...video,
					views: views + 1,
				});
			})
			.then(() => {
				InitCategories();
				localStorage.setItem(
					'currentVid',
					JSON.stringify({
						url,
						views,
						title,
						name,
						tag,
						description,
						videoId,
					})
				);
				const path = window.location.origin + '/video/' + videoId;
				window.open(path, '_blank');
			});
	};

	const handleVideoClick = () => {
		increaseViews();
	};

	return (
		<Card
			className={ classes.card }
			elevation={ 4 }
			onClick={ () => handleVideoClick() }
		>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton
							animation='wave'
							variant='circle'
							width={ 40 }
							height={ 40 }
						/>
					) : (
							<Avatar
								alt={ name }
								className={ classes.purple }
								src='/static/images/avatar/1.jpg'

							// src='https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg'
							/>
						)
				}
				// action={
				// 	loading ? null : (
				// 		<IconButton aria-label='settings'>
				// 			<MoreVertIcon />
				// 		</IconButton>
				// 	)
				// }
				title={
					loading ? (
						<Skeleton
							animation='wave'
							height={ 10 }
							width='80%'
							style={ { marginBottom: 6 } }
						/>
					) : (
							<div style={ { color: 'white', fontSize: '1.3em' } }>
								{name }
							</div>
						)
				}
			/>
			{loading ? (
				<Skeleton
					animation='wave'
					variant='rect'
					className={ classes.media }
				/>
			) : (
					<CardMedia
						className={ classes.cover }
						// image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
						title='Ted talk'
					>
						{/* <Player>
						<source src={vSrc} />
					</Player> */}
						{/* <iframe
						width='100%'
						height='100%'
						title={vSrc}
						src={vSrc}
					></iframe> */}

						<ReactPlayer
							// controls
							// width='1em'
							height='15rem'
							url={ url }
						/>
						<PlayArrowIcon className={ classes.playIcon } />
					</CardMedia>
				) }

			<CardContent>
				{ loading ? (
					<React.Fragment>
						<Skeleton
							animation='wave'
							height={ 10 }
							style={ { marginBottom: 6 } }
						/>
						<Skeleton animation='wave' height={ 10 } width='80%' />
					</React.Fragment>
				) : (
						<>
							<Typography className={ classes.title }>
								{ title }
							</Typography>
							<Typography
								variant='body2'
								color='textSecondary'
								component='p'
								style={ {
									color: 'lightgray',
									fontFamily: 'raleway',
								} }
							>
								{ views } views - { uploadedOn }
							</Typography>
						</>
					) }
			</CardContent>
		</Card>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		InitCategories: () => dispatch(actions.initCategories()),
	};
};

export default connect(null, mapDispatchToProps)(VideoCard);
