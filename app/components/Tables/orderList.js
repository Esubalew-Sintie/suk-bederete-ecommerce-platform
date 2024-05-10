
// "use client"
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import TextField from "@mui/material/TextField"; // Import TextField
// import Button from "@mui/material/Button";
// import {PopoverDemo} from "@/util/alert";

// function createData(id, name, calories, fat, carbs, protein) {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }



// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // with exampleArray.slice().sort(exampleComparator)
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
// 	{id: "product", numeric: false, disablePadding: false, label: "Product"},
// 	{id: "status", numeric: false, disablePadding: false, label: "Status"},
// 	{
// 		id: "paymentStatus",
// 		numeric: false,
// 		disablePadding: false,
// 		label: "Payment Status",
// 	},
// 	{
// 		id: "payment",
// 		numeric: false,
// 		disablePadding: false,
// 		label: "Payment Method",
// 	},
// 	{
// 		id: "shippingMethod",
// 		numeric: false,
// 		disablePadding: false,
// 		label: "Shipping Method",
// 	},
// 	{id: "amount", numeric: false, disablePadding: false, label: "Amount"},
// 	{id: "date", numeric: false, disablePadding: false, label: "Date"},
// 	{
// 		id: "actions",
// 		numeric: false,
// 		disablePadding: false,
// 		label: "Actions",
// 		renderCell: (params) => {
// 			return (
// 				<div>
// 					<Button
// 						onClick={(e) => onButtonClick(e, params.row)}
// 						variant="contained"
// 						color="primary"
// 					>
// 						Edit
// 					</Button>
// 					<Button
// 						onClick={(e) => onButtonClick(e, params.row)}
// 						variant="contained"
// 						color="secondary"
// 						style={{marginLeft: "8px"}}
// 					>
// 						Delete
// 					</Button>
// 				</div>
// 			);
// 		},
// 	},
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Order List
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable({rows}) {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('salary');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
// const [searchQuery, setSearchQuery] = React.useState("");

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       stableSort(rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage,
//       ),
//     [order, orderBy, page, rowsPerPage],
//   );

//   return (
//     <Box sx={{width: "100%"}}>
//         <Paper sx={{width: "100%", mb: 2}}>
//             <EnhancedTableToolbar numSelected={selected.length} />
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     p: 2,
//                 }}
//             >
//                 <TextField
//                     label="Search"
//                     variant="outlined"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     fullWidth
//                 />
//             </Box>
//             <TableContainer
//                 sx={{
//                     backgroundColor: "bg-blueGray-50", // Adjust the background color
//                 }}
//             >
//                 <Table
//                     sx={{minWidth: 750}}
//                     aria-labelledby="tableTitle"
//                     size={dense ? "small" : "medium"}
//                 >
//                     <EnhancedTableHead
//                         numSelected={selected.length}
//                         order={order}
//                         orderBy={orderBy}
//                         onSelectAllClick={handleSelectAllClick}
//                         onRequestSort={handleRequestSort}
//                         rowCount={rows?.length}
//                     />
//                     <TableBody>
//                         {visibleRows?.map((row, index) => {
//                             const isItemSelected = isSelected(row.id);
//                             const labelId = `enhanced-table-checkbox-${index}`;

//                             return (
//                                 <TableRow
//                                     hover
//                                     onClick={(event) => handleClick(event, row.id)}
//                                     role="checkbox"
//                                     aria-checked={isItemSelected}
//                                     tabIndex={-1}
//                                     key={row.id}
//                                     selected={isItemSelected}
//                                     sx={{cursor: "pointer"}}
//                                 >
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             color="primary"
//                                             checked={isItemSelected}
//                                             inputProps={{
//                                                 "aria-labelledby": labelId,
//                                             }}
//                                         />
//                                     </TableCell>

//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.product}
//                                     </TableCell>
//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.status}
//                                     </TableCell>
//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.paymentStatus}
//                                     </TableCell>
//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.payment}
//                                     </TableCell>
//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.shippingMethod}
//                                     </TableCell>
//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.amount}
//                                     </TableCell>
//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         {row.date}
//                                     </TableCell>

//                                     <TableCell align="left" sx={{color: "text-blueGray-500"}}>
//                                         <div onClick={(event) => event.stopPropagation()}>
//                                             <PopoverDemo />
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         })}
//                         {emptyRows > 0 && (
//                             <TableRow
//                                 style={{
//                                     height: (dense ? 33 : 53) * emptyRows,
//                                 }}
//                             >
//                                 <TableCell colSpan={6} />
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={rows?.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//         <FormControlLabel
//             control={<Switch checked={dense} onChange={handleChangeDense} />}
//             label="Dense padding"
//         />
//     </Box>
// );
// }


"use client";
import * as React from "react";
import PropTypes from "prop-types";
import {alpha} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField"; // Import TextField
import Button from "@mui/material/Button";
import {PopoverDemo} from "@/util/alert";
import {visuallyHidden} from "@mui/utils";

function createData(id, name, calories, fat, carbs, protein) {
	return {
		id,
		name,
		calories,
		fat,
		carbs,
		protein,
	};
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
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array?.map((el, index) => [el, index]);
	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
	{id: "product", numeric: false, disablePadding: false, label: "Product"},
	{id: "status", numeric: false, disablePadding: false, label: "Status"},
	{
		id: "paymentStatus",
		numeric: false,
		disablePadding: false,
		label: "Payment Status",
	},
	{
		id: "payment",
		numeric: false,
		disablePadding: false,
		label: "Payment Method",
	},
	{
		id: "shippingMethod",
		numeric: false,
		disablePadding: false,
		label: "Shipping Method",
	},
	{id: "amount", numeric: false, disablePadding: false, label: "Amount"},
	{id: "date", numeric: false, disablePadding: false, label: "Date"},
	{
		id: "actions",
		numeric: false,
		disablePadding: false,
		label: "Actions",
		renderCell: (params) => {
			return (
				<div>
					<Button
						onClick={(e) => onButtonClick(e, params.row)}
						variant="contained"
						color="primary"
					>
						Edit
					</Button>
					<Button
						onClick={(e) => onButtonClick(e, params.row)}
						variant="contained"
						color="secondary"
						style={{marginLeft: "8px"}}
					>
						Delete
					</Button>
				</div>
			);
		},
	},
];

function EnhancedTableHead(props) {
	const {
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
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={"left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
	const {numSelected} = props;

	return (
		<Toolbar
			sx={{
				pl: {sm: 2},
				pr: {xs: 1, sm: 1},
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{flex: "1 1 100%"}}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{flex: "1 1 100%"}}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Shop Name
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({rows}) {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("created_date");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [searchQuery, setSearchQuery] = React.useState("");

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};
	const onButtonClick = (e, row) => {
		e.stopPropagation(); // Prevents the click event from propagating up to parent elements
		// Implement your logic for editing and deleting rows here
		console.log("Editing or deleting row:", row);
	};

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
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

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(() => {
		const filteredRows = rows.filter((row) =>
			Object.values(row).some((val) =>
				String(val).toLowerCase().includes(searchQuery.toLowerCase())
			)
		);
		return stableSort(filteredRows, getComparator(order, orderBy))?.slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage
		);
	}, [order, orderBy, page, rowsPerPage, searchQuery]);

	return (
		<Box sx={{width: "100%"}}>
			<Paper sx={{width: "100%", mb: 2}}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						p: 2,
					}}
				>
					<TextField
						label="Search"
						variant="outlined"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						fullWidth
					/>
				</Box>
				<TableContainer
					sx={{
						backgroundColor: "bg-blueGray-50", // Adjust the background color
					}}
				>
					<Table
						sx={{minWidth: 750}}
						aria-labelledby="tableTitle"
						size={dense ? "small" : "medium"}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows?.length}
						/>
						<TableBody>
							{visibleRows?.map((row, index) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{cursor: "pointer"}}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": labelId,
												}}
											/>
										</TableCell>

										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.product}
										</TableCell>
										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.status}
										</TableCell>
										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.paymentStatus}
										</TableCell>
										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.payment}
										</TableCell>
										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.shippingMethod}
										</TableCell>
										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.amount}
										</TableCell>
										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											{row.date}
										</TableCell>

										<TableCell align="left" sx={{color: "text-blueGray-500"}}>
											<div onClick={(event) => event.stopPropagation()}>
												<PopoverDemo />
											</div>
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</Box>
	);
}
