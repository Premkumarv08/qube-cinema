import React, { useState, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export interface Column<T> {
  id: string;
  label: React.ReactNode;
  align?: "left" | "center" | "right";
  minWidth?: number;
  width?: string | number;
  format?: (value: any, row: T) => ReactNode;
  getValue?: (row: T) => any;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
  loadingMessage?: string;
  tableTitle?: string;
  paperProps?: React.ComponentProps<typeof Paper>;
  tableProps?: React.ComponentProps<typeof Table>;
  rowsPerPageOptions?: number[];
}

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#f7f9fc",
  "& .MuiTableCell-head": {
    fontWeight: 500,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "0.875rem",
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#f7f9fc",
  },
}));

function DataTable<T>({
  data,
  columns,
  isLoading,
  rowKey,
  emptyMessage = "No data found.",
  loadingMessage = "Loading data...",
  tableTitle,
  paperProps = {},
  tableProps = {},
  rowsPerPageOptions = [5, 10, 25, 50],
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography variant="body1">{loadingMessage}</Typography>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Typography variant="body1" sx={{ py: 4, textAlign: "center" }}>
        {emptyMessage}
      </Typography>
    );
  }

  const displayedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderCellContent = (column: Column<T>, row: T): ReactNode => {
    if (column.getValue) {
      const value = column.getValue(row);
      return column.format ? column.format(value, row) : (value as ReactNode);
    }
    
    const value = row[column.id as keyof T];
    
    if (column.format) {
      return column.format(value, row);
    }
    
    if (value === null || value === undefined) {
      return '';
    }
    
    if (
      typeof value === 'string' || 
      typeof value === 'number' || 
      typeof value === 'boolean'
    ) {
      return String(value);
    }
    
    return JSON.stringify(value);
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, boxShadow: "none", ...(paperProps.sx || {}) }} {...paperProps}>
      {tableTitle && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 500 }}>
            {tableTitle}
          </Typography>
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="data table" {...tableProps}>
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id.toString()}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth, width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {displayedData.map((row) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={rowKey(row)}>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align || "left"}>
                    {renderCellContent(column, row)}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ background: "#ffffff" }}
      />
    </Paper>
  );
}

export default DataTable;