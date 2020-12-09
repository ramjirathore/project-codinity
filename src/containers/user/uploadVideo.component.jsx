import React, { useState, useEffect } from 'react';
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

import { useAuth } from '../../contexts/AuthContext'
import { db, storage } from '../../config/fbConfig'

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

const UploadVideo = ({ upload }) => {
	const classes = useStyles();
	const [video, setVideo] = useState({
		title: '',
		description: '',
		tag: '',
		file: null,
	});

	const [open, setOpen] = useState(upload);
	console.log(video);
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	const handleClose = () => {
		setOpen(false);
    };
    
    const [videoObj, setVideoObj] = useState({
        college: '',
        name: '',
        email: ''
    }); 

    const [URL, setURL] = useState('');
    const [dataArrived, setDataArrived] = useState({
        storage: false,
        users: false
    })

    const { currentUser } = useAuth();

    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    const videoToDatabase = () => {
        const ref = db.ref(`unapproved videos/${currentUser.uid}`);

        // console.log(ref);
        // console.log(getCurrentDate());
        console.log(videoObj, URL);

        ref.set({
            uid: currentUser.uid,
            ...video,
            ...videoObj,
            url: URL,
            views: 0,
            uploadedOn: getCurrentDate()
        })
    }

    const batao = dataArrived.storage && dataArrived.users;

    useEffect(() => {   
        return () => {
            videoToDatabase();
        }     
    }, [batao])

    const fetchUserInfo = () => {
        const usersRef = db.ref().child('users');
		// console.log(usersRef);

		usersRef.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				// console.log(childSnapshot.key, childSnapshot.val());

                if(childSnapshot.key === String(currentUser.uid))
                {
                    console.log(childSnapshot.val());
                    setVideoObj({
                        ...videoObj,
                        ...Object(childSnapshot.val())
                    });

                    setDataArrived({
                        ...dataArrived,
                        users: true
                    })

                    return;
                }
            });
        });
    }

    const videoToStorage = (file) => {
        const storageRef = storage.ref();
        const videoRef = storageRef.child('videos/' + currentUser.uid + '/' + file.name);
        
        videoRef
        .put(file)
            .then(function(snapshot) {
                // console.log(snapshot);
                snapshot.ref
                .getDownloadURL()
                    .then(function (URL) {
                        console.log(URL);
                        setURL(String(URL));
                        setDataArrived({
                            ...dataArrived,
                            storage: true
                        })
                    })
                    .catch((error) =>
                        console.log('error:', error)
                    );
            })
    }

	const handleUpload = (event) => {
        event.preventDefault();
 
        videoToStorage(video.file);
        fetchUserInfo();
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
						onClick={handleUpload}
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
