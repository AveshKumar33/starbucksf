import React from "react";
import {
  Box,
  Link,
  Table,
  TableContainer,
  Typography,
  TableBody,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import theme from "../../../theme/theme";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function createData(calories: number, name: string, fat: number, carbs: number, protein: string) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, "New User"),
  createData(2, "Ice cream sandwich", 237, 9.0, "New User"),
  createData(3, "Eclair", 16.0, 24, "New User"),
  createData(4, "Cupcake", 305, 3.7, "New User"),
  createData(5, "Gingerbread", 356, 16.0, "New User"),
];

export const LatestUserAddedListing = () => {
  return (
    <Box sx={{ borderRadius: "10px", backgroundColor: "white", flexBasis: "70%", p: "24px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          alignItems: "start",
          padding: "0 24px",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {" "}
            Latest Added User{" "}
          </Typography>
          <Typography sx={{ color: "#808080" }} variant="caption">
            {" "}
            List of all new users who have scannec & Authorized
          </Typography>
        </Box>
        <Link
          href="#"
          underline="none"
          sx={{
            padding: "16px 0",
            borderRadius: "8px",
            color: "#808080",
            fontWeight: 500,
            fontFamily: "Roboto",
          }}
        >
          View All
        </Link>
      </Box>
      <Box>
        <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell sx={{ fontWeight: "600", fontSize: "16px" }} align="left">
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "600", fontSize: "16px" }} align="left">
                  Phone Number
                </TableCell>
                <TableCell sx={{ fontWeight: "600", fontSize: "16px" }} align="left">
                  Created On
                </TableCell>
                <TableCell sx={{ fontWeight: "600", fontSize: "16px" }} align="left">
                  Tags
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    {row.calories}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.secondary.main,
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    align="left"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.fat}</TableCell>
                  <TableCell align="left">{row.carbs}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={row.protein}
                        sx={{ background: theme.palette.secondary.main, color: "white" }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
