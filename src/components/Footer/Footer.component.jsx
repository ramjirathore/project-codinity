import React from 'react';
import { useTheme } from '@material-ui/core';

const Footer = () => {
	const theme = useTheme();
	return (
		<div style={{ background: theme.palette.common.grey, height: '100vh' }}>
			Footer
		</div>
	);
};

export default Footer;
