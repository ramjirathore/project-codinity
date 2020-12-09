import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Paper,
	Box,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useAuth } from '../../contexts/AuthContext';
import { connect } from 'react-redux';

const Copyright = () => {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' to='/' style={{ textDecoration: 'none' }}>
				Codinity
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage:
			'url(https://firebasestorage.googleapis.com/v0/b/codinity-6ab53.appspot.com/o/background%2Fdark1.jpg?alt=media&token=28f9dcda-a575-490c-8c6b-363251e03861)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	},
	company: {
		fontWeight: 500,
		background: 'linear-gradient(45deg, #fff, #888)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = () => {
	const classes = useStyles();

	const initialState = {
		email: '',
		password: '',
	};

	const [user, setUser] = useState(initialState);
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSignIn(event) {
		event.preventDefault();
		console.log(user);

		try {
			setError('');
			setLoading(true);
			await login(user.email, user.password);
			window.location.assign('/');
		} catch {
			setError('Failed to log in');
		}

		console.log(error);
	}

	return (
		<Grid container component='main' className={classes.root}>
			{/* {console.log(user.email)} */}
			<CssBaseline />
			<Grid item xs={false} sm={4} md={8} className={classes.image}>
				<Typography
					variant='h1'
					className={classes.company}
					component={Link}
					to='/'
				>
					Codinity
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sm={8}
				md={4}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<form
						className={classes.form}
						onSubmit={handleSignIn}
						noValidate
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={user.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={user.password}
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
						/>
						<FormControlLabel
							control={
								<Checkbox value='remember' color='primary' />
							}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							disabled={loading}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									variant='body2'
									to='/'
									style={{ textDecoration: 'none' }}
								>
									{/* path will be added */}
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									variant='body2'
									to='/signup'
									style={{ textDecoration: 'none' }}
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addVideoObject: (video) =>
			dispatch(actions.addVideo('dataStructure', video)),
		InitCategories: () => dispatch(actions.initCategories()),
		InitBlogs: () => dispatch(actions.initBlogs()),
	};
};

export default connect(null, mapDispatchToProps)(SignIn);
