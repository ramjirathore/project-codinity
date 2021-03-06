import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import 'date-fns';
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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import Alert from '../../components/Notification-Snackbar/notification.component';

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
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
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

const Event = ({ eventReady, name, email, college, reset }) => {
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

	const [finish, setFinish] = useState(false);

	const [open, setOpen] = useState(eventReady);

	const handleClose = () => {
		setOpen(false);
		// reset();
	};

	const { currentUser } = useAuth();

	const getDate = (today) => {
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();

		today = dd + '/' + mm + '/' + yyyy;
		return today;
	};

	const handleCreate = (e) => {
		e.preventDefault();
		const time = String(
			event.time.getHours() + ':' + event.time.getMinutes()
		);
		const date = getDate(event.date);
		const ref = db.ref(`events/`);
		ref.push({
			uid: currentUser.uid,
			...event,
			date,
			time,
			name,
			email,
			college,
			uploadedOn: getDate(new Date()),
		});
		setFinish(true);
		handleClose();
	};

	return (
		<div>
			{finish ? (
				<Alert
					message="Event Created!"
					title="Create an Event"
					type="success"
				/>
			) : null}
			<Dialog
				fullWidth
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
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
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="title"
							label="Event Title"
							name="title"
							autoComplete="title"
							autoFocus
							value={event.title}
							onChange={(e) =>
								setEvent({ ...event, title: e.target.value })
							}
						/>
						<TextField
							multiline
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="description"
							label="Description"
							name="description"
							autoComplete="description"
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
							variant="outlined"
							style={{ marginTop: 18, width: '100%' }}
						>
							<InputLabel htmlFor="outlined-age-native-simple">
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
								label="Category"
								inputProps={{
									name: 'tag',
									id: 'outlined-age-native-simple',
								}}
							>
								<option aria-label="None" value="" />
								{videoTypes.map((item) => (
									<option key={item.name} value={item.tag}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="meetlink"
							label="Meet Link"
							name="meetlink"
							autoComplete="meetlink"
							autoFocus
							value={event.link}
							onChange={(e) =>
								setEvent({ ...event, link: e.target.value })
							}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="hashtags"
							label="hashtags"
							name="hashtags"
							autoComplete="hashtags"
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
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									id="date-picker-inline"
									label="Choose Date"
									value={event.date}
									onChange={(date) => {
										setEvent({
											...event,
											date,
										});
									}}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
								<KeyboardTimePicker
									margin="normal"
									variant="inline"
									id="time-picker"
									label="Choose Time"
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
						size="large"
						autoFocus
						onClick={handleCreate}
						variant="contained"
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
		loading: state.usr.loading,
	};
};

export default connect(mapStateToProps)(Event);
