import React, { useState } from 'react';
import {
	withStyles,
	makeStyles,
	Dialog,
	IconButton,
	Avatar,
	Typography,
	Grid,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { deepOrange } from '@material-ui/core/colors';
import EmailIcon from '@material-ui/icons/Email';
import SchoolIcon from '@material-ui/icons/School';

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
		height: '17em',
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

const Profile = ({ profile, reset }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(profile);

	const handleClose = () => {
		setOpen(false);
		reset();
	};

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
				<DialogContent
					style={{
						color: 'black',
						marginTop: '5rem',
					}}
				>
					<Grid
						container
						alignItems='center'
						direction='column'
						spacing={2}
					>
						<Grid item>
							<Typography variant='h4'>Hemant Panwar</Typography>
						</Grid>
						<Grid item>
							<Grid
								container
								alignItems='center'
								style={{ opacity: 0.7 }}
							>
								<EmailIcon style={{ marginRight: 5 }} />
								<Typography variant='h6'>
									hemant2132@gmail.com
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<hr
								style={{
									margin: '1.5rem 0',
									width: '20em',
									opacity: 0.8,
								}}
							/>
						</Grid>
						<Grid item>
							<Grid
								container
								alignItems='center'
								style={{ opacity: 0.8 }}
							>
								<SchoolIcon style={{ marginRight: 5 }} />
								<Typography style={{ fontSize: '1em' }}>
									Jaypee Institute of Information Technology
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Profile;
