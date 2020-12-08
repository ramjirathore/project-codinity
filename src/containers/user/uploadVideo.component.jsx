import React, { useState } from 'react';
import {
	withStyles,
	makeStyles,
	Button,
	Dialog,
	IconButton,
	TextField,
	FormControl,
	InputLabel,
	Select,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
});

const useStyles = makeStyles((theme) => ({
	paper: {
		background: '#f5f5f5',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
	},
}));

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		color: 'white',
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const videoTypes = [
	{
		name: 'Data Structure',
		tag: 'dataStructure',
	},
	{
		name: 'Algorithms',
		tag: 'algorithms',
	},
	{
		name: 'C++',
		tag: 'cpp',
	},
	{
		name: 'Python',
		tag: 'python',
	},
	{
		name: 'JAVA',
		tag: 'java',
	},
	{
		name: 'ReactJS',
		tag: 'reactJS',
	},
	{
		name: 'AngularJS',
		tag: 'angularJS',
	},
	{
		name: 'VueJS',
		tag: 'vueJS',
	},
	{
		name: 'NodeJS',
		tag: 'nodeJS',
	},
];

const UploadVideo = () => {
	const classes = useStyles();
	const [video, setVideo] = useState({
		title: '',
		description: '',
		tag: '',
		file: null,
	});

	const [open, setOpen] = useState(false);
	console.log(video);
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	const handleClose = () => {
		setOpen(false);
	};

	const handleUpload = (event) => {
		event.preventDefault();
		/// handle Upload of video here
	};

	return (
		<div>
			<Dialog
				fullWidth
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
				classes={{ paper: classes.paper }}
			>
				<DialogTitle onClose={handleClose}>
					<b>Upload Video</b>
				</DialogTitle>
				<DialogContent dividers>
					<form
						className={classes.form}
						onSubmit={handleUpload}
						noValidate
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='title'
							label='Tile of Video'
							name='title'
							autoComplete='title'
							autoFocus
							value={video.title}
							onChange={(e) =>
								setVideo({ ...video, title: e.target.value })
							}
						/>
						<TextField
							multiline
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='description'
							label='Description'
							name='description'
							autoComplete='description'
							autoFocus
							rows={8}
							rowsMax={8}
							value={video.description}
							onChange={(e) =>
								setVideo({
									...video,
									description: e.target.value,
								})
							}
						/>
						<FormControl
							variant='outlined'
							style={{ marginTop: 18, width: '100%' }}
						>
							<InputLabel htmlFor='outlined-age-native-simple'>
								Category
							</InputLabel>
							<Select
								native
								required
								fullWidth
								value={video.tag}
								onChange={(e) =>
									setVideo({
										...video,
										tag: e.target.value,
									})
								}
								label='Category'
								inputProps={{
									name: 'tag',
									id: 'outlined-age-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								{videoTypes.map((item) => (
									<option key={item.name} value={item.tag}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</form>
					<div style={{ marginTop: 18 }}>
						<Button variant='contained' component='label'>
							Choose File
							<input
								type='file'
								hidden
								onChange={(e) =>
									setVideo({
										...video,
										file: e.target.files[0],
									})
								}
							/>
						</Button>
					</div>
					{/* {video.file !== null ? 'video.file.name' : 'null'} */}
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handleClose}
						variant='contained'
						style={{ backgroundColor: 'blue', color: 'white' }}
					>
						Upload
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default UploadVideo;
