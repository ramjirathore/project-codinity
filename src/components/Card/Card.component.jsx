import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

import ReactPlayer from 'react-player/lazy';

// import { Player } from 'video-react';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 390,
		// margin: theme.spacing(2),
		background: '#303030',
		color: 'white',
		'&hover': {
			cursor: 'pointer',
		},
	},
	media: {
		height: 150,
	},
}));

const VideoCard = ({ creator, title, loading, vSrc, id }) => {
	const classes = useStyles();

	const handleVideoClick = (videoId) => {
		const path = window.location.origin + '/video/' + videoId;
		window.open(path, '_blank');
	};

	return (
		<Card
			className={classes.card}
			elevation={4}
			onClick={() => handleVideoClick(id)}
		>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton
							animation='wave'
							variant='circle'
							width={40}
							height={40}
						/>
					) : (
						<Avatar
							alt='Ted talk'
							src='https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg'
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
							height={10}
							width='80%'
							style={{ marginBottom: 6 }}
						/>
					) : (
						<div style={{ color: 'white', fontSize: '1.3em' }}>
							{creator}
						</div>
					)
				}
			/>
			{loading ? (
				<Skeleton
					animation='wave'
					variant='rect'
					className={classes.media}
				/>
			) : (
				<CardMedia
					className={classes.media}
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
						width='13.5vw'
						height='15vh'
						url='https://firebasestorage.googleapis.com/v0/b/codinity-6ab53.appspot.com/o/videos%2FqUjH70lBJaVBsRklImEqgJR9qSj1%2FWhatsApp%20Video%202020-12-02%20at%2017.01.17.mp4?alt=media&token=f0a4f58c-77fd-4d6f-b773-f98d16e0e13a'
					/>
				</CardMedia>
			)}

			<CardContent>
				{loading ? (
					<React.Fragment>
						<Skeleton
							animation='wave'
							height={10}
							style={{ marginBottom: 6 }}
						/>
						<Skeleton animation='wave' height={10} width='80%' />
					</React.Fragment>
				) : (
					<>
						<Typography
							style={{
								color: 'white',
								fontFamily: 'roboto',
								fontSize: '1.2em',
							}}
						>
							{title}
						</Typography>
						<Typography
							variant='body2'
							color='textSecondary'
							component='p'
							style={{
								color: 'lightgray',
								fontFamily: 'raleway',
							}}
						>
							3.2M views - 5 days ago
						</Typography>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default VideoCard;
