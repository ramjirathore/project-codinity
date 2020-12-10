import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	Button,
	Checkbox,
	TablePagination,
	lighten,
	makeStyles,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { connect } from 'react-redux';

// import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/fbConfig';

function createData(email, name, title, college, uid, url) {
	return { email, name, college, title, uid, url };
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'email',
		numeric: false,
		disablePadding: false,
		label: 'Email ID',
	},
	{ id: 'name', numeric: false, disablePadding: false, label: 'Name' },
	{
		id: 'videoTitle',
		numeric: false,
		disablePadding: false,
		label: 'Video Title',
	},
	{
		id: 'college',
		numeric: false,
		disablePadding: false,
		label: 'College',
	},
];

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							<b>
								{' '}
								{headCell.label}
								{orderBy === headCell.id ? (
									<span className={classes.visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</span>
								) : null}
							</b>
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.common.black, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.comom.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color='inherit'
					variant='subtitle1'
					component='div'
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant='h5'
					id='tableTitle'
					component='div'
				>
					<b>Video Requests</b>
				</Typography>
			)}

			{numSelected > 0 ? (
				<div style={{ flex: 1, display: 'flex' }}>
					<Button
						variant='contained'
						style={{
							background: '#4CAF50',
							color: 'white',
							fontWeight: 500,
							marginRight: 10,
						}}
						onClick={props.accept}
					>
						Accept
					</Button>
					<Button
						variant='contained'
						style={{ background: '#f44336', color: 'white' }}
						onClick={props.reject}
					>
						Reject
					</Button>
				</div>
			) : null}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		background: '#f6f6f6',
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	laoding: {
		display: 'flex',
		height: '80vh',
		color: 'white',
		fontSize: '2rem',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const EnhancedTable = (props) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	// console.log(props.videos);
	let rows = [];
	console.log(selected);
	if (!props.loading) {
		rows = props.videos.map((item) => {
			return createData(
				item.email,
				item.name,
				item.title,
				item.college,
				item.uid,
				item.url
			);
		});
	}

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.uid);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const acceptVideos = () => {
		console.log('accept clicked');
		const videosRef = db.ref().child('unapproved videos');

		const extractToken = (url) => {
			let pos = url.indexOf('token');
			let res = url.substring(pos + 6);
			return res;
		};

		for (let index in selected) {
			let uid = selected[index];
			const vidRef = videosRef.child(`${uid}`);
			let video, videoId;
			vidRef
				.once('value', (snapshot) => {
					video = snapshot.val();

					video = {
						...video,
						uid,
					};
				})
				.then(() => {
					videoId = extractToken(video.url);
					// console.log(videoId);
				})
				.then(() => {
					// console.log("in push 1")
					// console.log(uid, video);
					const ref = db.ref(`categories/${video.tag}/${videoId}`);
					// console.log("pushing", ref.toString());
					ref.set(video);
				})
				.then(() => {
					// console.log("in remove 1");
					vidRef.remove();
					window.location.reload();
				});
		}
	};

	const rejectVideos = () => {
		console.log('reject clicked');
		const videosRef = db.ref().child('unapproved videos');

		for (let index in selected) {
			let uid = selected[index];
			const vidRef = videosRef.child(`${uid}`);
			let video;
			vidRef
				.once('value', (snapshot) => {
					video = snapshot.val();

					video = {
						...video,
						uid,
					};
				})
				.then(() => {
					// console.log("in remove 2");
					vidRef.remove();
					window.location.reload();
				});
		}
	};

	return (
		<div className={classes.root}>
			{!props.loading ? (
				<>
					<Paper className={classes.paper}>
						<EnhancedTableToolbar
							numSelected={selected.length}
							accept={acceptVideos}
							reject={rejectVideos}
						/>
						<TableContainer>
							<Table
								className={classes.table}
								aria-labelledby='tableTitle'
								size={dense ? 'small' : 'medium'}
								aria-label='enhanced table'
							>
								<EnhancedTableHead
									classes={classes}
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={rows.length}
								/>
								<TableBody>
									{stableSort(
										rows,
										getComparator(order, orderBy)
									)
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((row, index) => {
											const isItemSelected = isSelected(
												row.uid
											);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													onClick={(event) =>
														handleClick(
															event,
															row.uid
														)
													}
													role='checkbox'
													aria-checked={
														isItemSelected
													}
													tabIndex={-1}
													key={row.email}
													selected={isItemSelected}
												>
													<TableCell padding='checkbox'>
														<Checkbox
															checked={
																isItemSelected
															}
															inputProps={{
																'aria-labelledby': labelId,
															}}
														/>
													</TableCell>
													<TableCell
														component='th'
														id={labelId}
														scope='row'
														padding='none'
													>
														{row.email}
													</TableCell>
													<TableCell>
														{row.name}
													</TableCell>
													{/**THIS WILL HAVE VIDEO LINK */}
													<TableCell>
														<a
															href={row.url}
															target='_blank'
															rel='noopener noreferrer'
														>
															{row.title}
														</a>
													</TableCell>
													<TableCell>
														{row.college}
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height:
													(dense ? 33 : 53) *
													emptyRows,
											}}
										>
											<TableCell colSpan={6}>
												{rows.length === 0 ? (
													<Typography
														variant='h5'
														style={{
															display: 'flex',
															justifyContent:
																'center',
															fontFamily:
																'Roboto',
														}}
													>
														No Requests
													</Typography>
												) : null}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 20]}
							component='div'
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Paper>
					<FormControlLabel
						control={
							<Switch
								checked={dense}
								onChange={handleChangeDense}
							/>
						}
						style={{ color: 'white' }}
						label='Dense Padding'
					/>
				</>
			) : (
				<div className={classes.loading}>Loading...</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		videos: state.req.unapproved,
		laoding: state.req.loading,
	};
};

export default React.memo(connect(mapStateToProps)(EnhancedTable));
