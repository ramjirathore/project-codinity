import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import {
	withStyles,
	makeStyles,
	Button,
	Dialog,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import Alert from '../../components/Notification-Snackbar/notification.component';

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

const Blogs = ({ blogReady, name, email, college, reset }) => {
	const classes = useStyles();
	const [blog, setBlog] = useState({
		title: '',
		content: '',
		hashTags: '',
	});

	const [finish, setFinish] = useState(false);

	const [open, setOpen] = useState(blogReady);

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

		const ref = db.ref(`blogs/`);
		ref.push({
			uid: currentUser.uid,
			...blog,
			name,
			email,
			uploadedOn: getDate(new Date()),
		});
		setFinish(true);
		handleClose();
	};

	return (
		<div>
			{finish ? (
				<Alert
					message='Blog Uploaded!'
					title='Write a blog'
					type='success'
				/>
			) : null}
			<Dialog
				fullWidth
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
				classes={{ paper: classes.paper }}
			>
				<DialogTitle onClose={handleClose}>
					<b>Create blog</b>
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
							label='Blog Title'
							name='title'
							autoComplete='title'
							autoFocus
							value={blog.title}
							onChange={(e) =>
								setBlog({ ...blog, title: e.target.value })
							}
						/>
						<TextField
							multiline
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='content'
							label='Content'
							name='content'
							autoComplete='content'
							autoFocus
							rows={8}
							rowsMax={8}
							value={blog.content}
							onChange={(e) =>
								setBlog({
									...blog,
									content: e.target.value,
								})
							}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='hashtags'
							label='Hashtags'
							name='hashtags'
							autoComplete='hashtags'
							autoFocus
							value={blog.hashTags}
							onChange={(e) =>
								setBlog({ ...blog, hashTags: e.target.value })
							}
						/>
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
						Upload
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
		loading: state.usr.loading,
	};
};

export default connect(mapStateToProps)(Blogs);
