import React, { useState, useEffect } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

const NotificationSnackbar = (props) => {
	const [open, setOpen] = useState(false);

	// Position of the bar
	const vertical = 'top';
	const horizontal = 'center';

	useEffect(() => {
		setOpen(true);
	}, [props.type]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<React.Fragment>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				autoHideDuration={6000}
				TransitionComponent={Slide}
				key={vertical + horizontal}
			>
				<Alert
					elevation={6}
					onClose={handleClose}
					severity={props.type}
				>
					<AlertTitle>
						<strong>{props.title}</strong>
					</AlertTitle>
					{props.message}
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
};

export default NotificationSnackbar;
