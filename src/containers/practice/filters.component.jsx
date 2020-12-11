import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	makeStyles,
	FormControl,
	Select,
	Button,
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
	details: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '11em',
	},
}));

const Filters = ({ filter, college, setCollege }) => {
	const classes = useStyles();

	return (
		<>
			<Accordion classes={{ root: classes.filter }} elevation={0}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography className={classes.heading}>
						<b>FILTERS</b>
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					<FormControl variant='outlined' style={{ marginTop: 18 }}>
						<InputLabel htmlFor='outlined-age-native-simple'>
							<Typography style={{ color: 'white' }}>
								College
							</Typography>
						</InputLabel>
						<Select
							// classes={{ nativeInput: { color: 'white' } }}
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
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							style={{
								background: 'blue',
								textTransform: 'capitalize',
							}}
							variant='contained'
							color='primary'
							onClick={() => filter(college)}
						>
							Apply
						</Button>
						<Button
							className={classes.button}
							style={{
								marginLeft: '20px',
								background: 'red',
								textTransform: 'capitalize',
							}}
							variant='contained'
							color='primary'
							onClick={() => setCollege('')}
						>
							Reset
						</Button>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default Filters;
