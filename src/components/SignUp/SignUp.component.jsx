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
	FormControl,
	InputLabel,
	Select,
} from '@material-ui/core';
import list from './collegeslist.json';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
		textDecoration: 'none !important',
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

const SignUp = () => {
	const classes = useStyles();

	const initialState = {
		name: '',
		email: '',
		password: '',
		college: '',
	};

	const [user, setUser] = useState(initialState);

	const handleSignUp = (event) => {
		event.preventDefault();
		console.log(user);
		setUser(initialState);
		window.location.assign('/');
	};

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={8} className={classes.image}>
				<Typography variant='h1' className={classes.company} to='/'>
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
						Sign Up
					</Typography>
					<form
						className={classes.form}
						onSubmit={handleSignUp}
						noValidate
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='name'
							label='Name'
							name='name'
							autoComplete='name'
							autoFocus
							value={user.name}
							onChange={(e) =>
								setUser({ ...user, name: e.target.value })
							}
						/>
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
						<FormControl
							variant='outlined'
							style={{ marginTop: 18 }}
						>
							<InputLabel htmlFor='outlined-age-native-simple'>
								College
							</InputLabel>
							<Select
								native
								required
								autoWidth
								value={user.college}
								onChange={(e) =>
									setUser({
										...user,
										college: e.target.value,
									})
								}
								label='College'
								inputProps={{
									name: 'age',
									id: 'outlined-age-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								{list.map((item) => (
									<option
										key={item.college}
										value={item.college}
									>
										{item.college}
									</option>
								))}
							</Select>
						</FormControl>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify='center'>
							<Grid item>
								<Link
									variant='body2'
									to='/login'
									style={{
										textDecoration: 'none',
									}}
								>
									Already have an account? SignIn
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

export default SignUp;
