import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

// import { Player } from 'video-react';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345,
		margin: theme.spacing(2),
		background: '#303030',
		color: 'white'
	},
	media: {
		height: 190
	}
}));

const VideoCard = (props) => {
	const { loading, vSrc } = props;
	const classes = useStyles();

	return (
		<Card className={classes.card} elevation={4}>
			<CardHeader
				style={{ color: 'white' }}
				avatar={
					loading ? (
						<Skeleton
							animation="wave"
							variant="circle"
							width={40}
							height={40}
						/>
					) : (
						<Avatar
							alt="Ted talk"
							src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
						/>
					)
				}
				action={
					loading ? null : (
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={
					loading ? (
						<Skeleton
							animation="wave"
							height={10}
							width="80%"
							style={{ marginBottom: 6 }}
						/>
					) : (
						'Ted'
					)
				}
				subheader={
					loading ? (
						<Skeleton animation="wave" height={10} width="40%" />
					) : (
						'5 hours ago'
					)
				}
			/>
			{loading ? (
				<Skeleton animation="wave" variant="rect" className={classes.media} />
			) : (
				<CardMedia
					className={classes.media}
					// image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
					title="Ted talk"
				>
					{/* <Player>
						<source src={vSrc} />
					</Player> */}
					<iframe width="100%" height="100%" src={vSrc}></iframe>
				</CardMedia>
			)}

			<CardContent>
				{loading ? (
					<React.Fragment>
						<Skeleton
							animation="wave"
							height={10}
							style={{ marginBottom: 6 }}
						/>
						<Skeleton animation="wave" height={10} width="80%" />
					</React.Fragment>
				) : (
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						style={{ color: 'white', fontFamily: 'roboto' }}
					>
						{
							"Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
						}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};

export default VideoCard;
