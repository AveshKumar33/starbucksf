import theme from "../../../theme/theme";
import {
  Box,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { SideBar } from "../organisms/SideBar";
import { Header } from "../organisms/Header";
import SearchIcon from "@mui/icons-material/Search";
import chatboticon from "../../../assets/images/robot_2.svg";

function createData(
  id: number,
  chatbotlist: string,
  createdate: string,
  updateddate: string,
  totalchats: number,
  openchats: number,
  finished: number,
  status: string
) {
  return {
    id,
    chatbotlist,
    createdate,
    updateddate,
    totalchats,
    openchats,
    finished,
    status,
  };
}
const rows = [
  createData(
    1,
    "hello",
    "27/06/23 15:01 SGT",
    "27/06/23 15:01 SGT",
    4,
    159,
    6.0,
    "Active"
  ),
  createData(
    2,
    "hello",
    "27/06/23 15:01 SGT",
    "27/06/23 15:01 SGT",
    4,
    237,
    9.0,
    "Inactive"
  ),
];
export const Chatbotlisting: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          flexGrow: "1",
          bgcolor: "#F0F6FE",
        }}
      >
        <Box sx={{ flexBasis: "60px" }}>
          <SideBar />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Header heading="Manage Chatbots" dashBoard={false} />
          <Box sx={{ p: "24px", marginTop: "68px" }}>
            <Box
              sx={{
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "24px",
                px: "32px",
                py: "24px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Chatbots List
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  sx={{
                    marginRight: "1rem",
                    flex: 1,
                    minWidth: "100px",
                    borderRadius: "8px",
                  }}
                  value=""
                  placeholder="Search"
                  size="small"
                  inputProps={{ "aria-label": "search google maps" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{ bgcolor: "#008DF1", gap: "10px", borderRadius: "4px" }}
                  variant="contained"
                >
                  <Image
                    width={24}
                    height={24}
                    src={chatboticon}
                    alt="QrCodeIcon"
                  />
                  <Typography sx={{ color: "#fff" }}>Create Chatbot</Typography>
                </Button>
              </Box>
            </Box>

            <TableContainer sx={{ bgcolor: "#fff", borderRadius: "10px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}}>#</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Chatbot List</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Created On</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Updated on</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Total Chats</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Open Chats</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Finished</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Status</TableCell>
                    <TableCell sx={{fontSize:'16px' , fontWeight:'600'}} align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"  sx={{fontSize:'16px' , fontWeight:'600'}}>
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.chatbotlist}</TableCell>
                      <TableCell align="left">{row.createdate}</TableCell>
                      <TableCell align="left">{row.updateddate}</TableCell>
                      <TableCell align="left">{row.totalchats}</TableCell>
                      <TableCell align="left">{row.openchats}</TableCell>
                      <TableCell align="left">{row.finished}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">::</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
