import * as React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
} from "@mui/material";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../UI/Alert-dialog";

import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

// Columns definition
const headCells = [
  { id: "milestone", numeric: false, disablePadding: true, label: "Milestone" },
  {
    id: "start_date",
    numeric: false,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "end_date",
    numeric: false,
    disablePadding: false,
    label: "Target Date",
  },
  { id: "duration", numeric: true, disablePadding: false, label: "Duration" },
  { id: "weight", numeric: true, disablePadding: false, label: "Weight (%)" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "task" ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            style={{ fontWeight: "bold", fontSize: "16px" }}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default function GanttTaskTable({ task, onRowClick, refetch }) {
  const selectedProject = useSelector(
    (state) => state.selectedProject.selectedProjectName
  );
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("start_date");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  // New state for totals
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    setRows(task || []);
  }, [task]);

  // Calculate total weight and duration
  useEffect(() => {
    if (!rows || rows.length === 0) {
      setTotalWeight(0);
      setTotalDuration(0);
      return;
    }

    let minStartDate = null;
    let maxEndDate = null;
    let weightSum = 0;

    rows.forEach((row) => {
      if (row.start_date) {
        const start = new Date(row.start_date);
        if (!minStartDate || start < minStartDate) minStartDate = start;
      }
      if (row.end_date) {
        const end = new Date(row.end_date);
        if (!maxEndDate || end > maxEndDate) maxEndDate = end;
      }
      weightSum += parseFloat(row.weight) || 0;
    });

    // Calculate duration in days between earliest start and latest end
    let duration = 0;
    if (minStartDate && maxEndDate) {
      duration = Math.ceil((maxEndDate - minStartDate) / (1000 * 60 * 60 * 24)) + 1;
    }

    setTotalWeight(weightSum.toFixed(2));
    setTotalDuration(duration);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = async (taskName) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/timeline/task-delete`,
        { project_name: selectedProject, task: taskName }
      );
      refetch();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const visibleRows = React.useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [rows, order, orderBy]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, px: 2 }}>
                    No tasks available
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row, index) => {
                  if (!row.milestone) return null;
                  const isItemSelected = selected.includes(row.milestone);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => onRowClick?.(row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id || row.milestone}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox" />
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.milestone}
                      </TableCell>
                      <TableCell align="center">
                        {row.start_date
                          ? format(new Date(row.start_date), "dd-MM-yyyy")
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {row.end_date
                          ? format(new Date(row.end_date), "dd-MM-yyyy")
                          : ""}
                      </TableCell>
                      <TableCell align="center">{row.duration}</TableCell>
                      <TableCell align="center">{row.weight}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTask(row.milestone);
                            setAlertOpen(true);
                          }}
                        >
                          <DeleteIcon sx={{ color: "black" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}

              {/* Summary row */}
              <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                <TableCell padding="checkbox" />
                <TableCell component="th" scope="row" padding="none">
                </TableCell>
                <TableCell align="center">Total Duration</TableCell>
                <TableCell align="center">{totalDuration}</TableCell>
                <TableCell align="right">Total Weights</TableCell>
                <TableCell align="left">{totalWeight}</TableCell>
                <TableCell align="center" />
              </TableRow>

              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      <span className="font-bold">{deleteTask}</span> from server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
                      onClick={() => {
                        handleDelete(deleteTask);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
