import React from 'react';
import { useTheme } from '@material-ui/core';

const Landing = () => {
	const theme = useTheme();
	return (
		<div style={{ background: theme.palette.common.black, height: '100vh' }}>
			Landing page
		</div>
	);
};

export default Landing;
