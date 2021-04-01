import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15px"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableCellHeader: {
    backgroundColor: "#252525",
    color: "#fff",
    minWidth: "55px"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

function BankTable({ rows,city }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageAlive, setPageAlive] = useState(false);
  useEffect(() => {
    const unsub = () => {
      setPageAlive(true);
      setPage(0);
    };
    return unsub;
  }, [rows]);

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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
    <div style={{ margin: "15px 0",fontSize:"1.4rem" }}>Favorite Banks</div>
      <Paper elevation={5} className={classes.paper}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellHeader} align="center">
                  Bank ID
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  Bank name
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  IFSC
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  Branch
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  Address
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  City
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  District
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  State
                </TableCell>
              </TableRow>
            </TableHead>

            {rows && rows.length > 0 && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableBody>
                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                      <TableCell align="center">{row.bank_id}</TableCell>
                      <TableCell align="center">{row.bank_name}</TableCell>
                      <TableCell align="center">{row.ifsc}</TableCell>
                      <TableCell align="center">{row.branch}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.city}</TableCell>
                      <TableCell align="center">{row.district}</TableCell>
                      <TableCell align="center">{row.state}</TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            {rows.length === 0 && !pageAlive && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell align="center" colSpan={8}>
                  <img
                    src="https://s2.svgbox.net/loaders.svg?ic=elastic-spinner&color=000000"
                    width="32"
                    height="32"
                    alt="loader"
                  />
                </TableCell>
              </TableRow>
            )}
            {rows.length === 0 && pageAlive && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell align="center" colSpan={8}>
                  Sorry...data not found!!
                </TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Toggle Spacing"
      />
    </div>
  );
}

export default React.memo(BankTable);
