import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#F54',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 500,
		// backgroundColor: '#eee',
	},
});

const CustomizedTable = ({ header, rows }) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						{header.map((head, index) => (
							<StyledTableCell key={index}>
								<b>{head}</b>
							</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow key={index}>
							{Object.entries(row).map(([, val]) => (
								<StyledTableCell
									key={val}
									scope='row'
									align='left'
								>
									{val}
								</StyledTableCell>
							))}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CustomizedTable;
