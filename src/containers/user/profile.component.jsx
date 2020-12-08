import React, { useState } from 'react';
import {
	withStyles,
	makeStyles,
	Dialog,
	IconButton,
	Avatar,
	Container,
	// DialogTitle,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { deepOrange } from '@material-ui/core/colors';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		color: 'white',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
});

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '40em',
	},
	background: {
		backgroundImage: 'url(https://source.unsplash.com/random/?abstract)',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		height: '16em',
		// width: '100%',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		width: '2em',
		height: '2em',
		fontSize: '4em',
		marginBottom: '-1.25em',
	},
}));

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			{children}
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

const Profile = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	const handleClose = () => {
		setOpen(false);
	};

	// const handleUpload = (event) => {
	// 	event.preventDefault();
	// 	/// handle Upload of video here
	// };

	return (
		<div>
			<Dialog
				fullWidth
				maxWidth='xs'
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
				classes={{ paper: classes.paper }}
			>
				<DialogTitle
					onClose={handleClose}
					className={classes.background}
				>
					<Avatar
						className={classes.orange}
						alt='Hemant Panwar'
						src='/static/images/avatar/1.jpg'
					/>
				</DialogTitle>
				<DialogContent dividers>
					<Container style={{ color: 'black', marginTop: '4em' }}>
						Hemant Panwar
					</Container>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Profile;
