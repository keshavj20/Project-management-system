import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#333",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },

  "&:hover": {
    backgroundColor: "#e3f2fd",

    cursor: "pointer",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({
  headers = [],
  rows = [],
  onRowClick,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,

        overflow: "hidden",

        mt: 2,
      }}
    >
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers?.map((header, index) => (
              <StyledTableCell key={index} align={header.align || "left"}>
                {header.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!rows ? (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                <Typography variant="body1" sx={{ py: 2, color: "gray" }}>
                  No Data Available
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <StyledTableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                //      sx={{
                //   "&:hover":{
                //     background:"#f0f0f0",
                //     cursor:"pointer"
                //   }
                // }}
              >
                {/* {headers.map((header, cellIndex) => {
                  // const key = header.toLowerCase();
                  return (
                    <StyledTableCell key={cellIndex}>
                      {row[header.key]}
                    </StyledTableCell>
                  );
                })} */}
                {headers.map((header, cellIndex) => (
                  <StyledTableCell
                    key={cellIndex}
                    align={header.align || "left"}
                  >
                    {row[header.key]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
