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
	Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';

import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/fbConfig';

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

const Event = ({ eventReady, name, email, college }) => {
	const classes = useStyles();
	const [event, setEvent] = useState({
		title: '',
		description: '',
		tag: '',
		link: '',
		date: new Date(),
		time: new Date(),
		hashTags: '',
	});

	const [open, setOpen] = useState(eventReady);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	const { currentUser } = useAuth();

	const getCurrentDate = () => {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();

		today = dd + '/' + mm + '/' + yyyy;
		return today;
	};

	const eventToDatabase = (URL) => {
		const ref = db.ref(`events/`);

		// console.log(ref);
		// console.log(getCurrentDate());

		ref.push({
			uid: currentUser.uid,
			...event,
			url: URL,
			name,
			email,
			college,
			uploadedOn: getCurrentDate(),
		});
	};

	// const videoToStorage = (file) => {
	// 	const storageRef = storage.ref();
	// 	const videoRef = storageRef.child(
	// 		'videos/' + currentUser.uid + '/' + file.name
	// 	);

	// 	videoRef.put(file).then(function (snapshot) {
	// 		// console.log(snapshot);
	// 		snapshot.ref
	// 			.getDownloadURL()
	// 			.then(function (URL) {
	// 				console.log(URL);
	// 				videoToDatabase(String(URL));
	// 			})
	// 			.catch((error) => console.log('error:', error));
	// 	});
	// };

	const handleCreate = (event) => {
		event.preventDefault();
		// videoToStorage(video.file);
		eventToDatabase();
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
					<b>Create Event</b>
				</DialogTitle>
				<DialogContent dividers>
					<form
						className={classes.form}
						onSubmit={handleCreate}
						noValidate
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='title'
							label='Event Title'
							name='title'
							autoComplete='title'
							autoFocus
							value={event.title}
							onChange={(e) =>
								setEvent({ ...event, title: e.target.value })
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
							value={event.description}
							onChange={(e) =>
								setEvent({
									...event,
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
								value={event.tag}
								onChange={(e) =>
									setEvent({
										...event,
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
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='hashtags'
							label='hashtags'
							name='hashtags'
							autoComplete='hashtags'
							autoFocus
							value={event.hashTags}
							onChange={(e) =>
								setEvent({ ...event, hashTags: e.target.value })
							}
						/>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<KeyboardDatePicker
									disableToolbar
									variant='inline'
									format='MM/dd/yyyy'
									margin='normal'
									id='date-picker-inline'
									label='Choose Date'
									value={event.date}
									onChange={(date) =>
										setEvent({
											...event,
											date,
										})
									}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
								<KeyboardTimePicker
									margin='normal'
									variant='inline'
									id='time-picker'
									label='Choose Time'
									value={event.time}
									onChange={(time) =>
										setEvent({
											...event,
											time,
										})
									}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
								/>
							</div>
						</MuiPickersUtilsProvider>
					</form>
				</DialogContent>
				<DialogActions
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Button
						size='large'
						autoFocus
						onClick={handleCreate}
						variant='contained'
						style={{ backgroundColor: 'blue', color: 'white' }}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		name: state.usr.name,
		email: state.usr.email,
		college: state.usr.college,
		laoding: state.usr.loading,
	};
};

export default connect(mapStateToProps)(Event);
