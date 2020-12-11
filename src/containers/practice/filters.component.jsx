import React, { useState } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	makeStyles,
	FormControl,
	Select,
	InputLabel,
} from '@material-ui/core';
import list from '../../components/SignUp/collegeslist.json';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
	filter: {
		marginTop: 20,
		backgroundColor: theme.palette.common.grey,
		maxWidth: '100%',
		color: 'white',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const Filters = () => {
	const classes = useStyles();
	const [college, setCollege] = useState('');

	return (
		<>
			<Accordion classes={{ root: classes.filter }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography className={classes.heading}>
						<b>FILTERS</b>
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormControl variant='outlined' style={{ marginTop: 18 }}>
						<InputLabel htmlFor='outlined-age-native-simple'>
							<b style={{ color: 'white' }}>College</b>
						</InputLabel>
						<Select
							classes={{ outlined: { color: 'white' } }}
							native
							required
							autoWidth
							value={college}
							onChange={(e) => setCollege(e.target.value)}
							label='College'
							inputProps={{
								name: 'age',
								id: 'outlined-age-native-simple',
							}}
						>
							<option aria-label='None' value='' />
							{list.map((item) => (
								<option key={item.college} value={item.college}>
									{item.college}
								</option>
							))}
						</Select>
                    </FormControl>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default Filters;
