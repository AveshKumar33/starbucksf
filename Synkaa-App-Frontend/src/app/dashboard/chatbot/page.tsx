"use client";
import {
  Box,
  Button,
  // CircularProgress,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import chatboticon from "@/assets/images/robot_2.svg";
import { useRouter } from "next/navigation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatbotServices from "@/services/chatbot.services";
import { ConvertTime } from "@/components/ConvertTime";
import RenameChatbotModal from "@/components/RenameChatbot";
import InactiveBot from "@/components/InactiveBot";
import DeleteBot from "@/components/DeleteChatbotModal";
import Toaster from "@/components/Toaster";
interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}
import LoaderGlobal from "@/components/LoaderGlobal";
import ActiveBot from "@/components/ActiveBot";
import { debounce } from "lodash";
// import LoaderGlobal from "@/components/LoaderGlobal";

// function createData(
//   id: number,
//   chatbotlist: string,
//   createdate: string,
//   updateddate: string,
//   totalchats: number,
//   openchats: number,
//   finished: number,
//   status: string,
// ) {
//   return {
//     id,
//     chatbotlist,
//     createdate,
//     updateddate,
//     totalchats,
//     openchats,
//     finished,
//     status,
//   };
// }
// const rows = [
//   createData(1, "hello", "27/06/23 15:01 SGT", "27/06/23 15:01 SGT", 4, 159, 6.0, "Active"),
//   createData(2, "hello", "27/06/23 15:01 SGT", "27/06/23 15:01 SGT", 4, 237, 9.0, "Inactive"),
// ];

interface GetChatbotTypes {
  _id: string;
  uuid: string;
  name: string;
  chatData: string;
  linkedNodes: any;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  totalChats: number;
  finishChats: number;
  openChats: number;
}
const Chatbotlisting: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [loading, setLoading] = React.useState<boolean>(true);
  const open = Boolean(anchorEl);
  const [chatbots, setChatbots] = React.useState<GetChatbotTypes[] | null>();
  const [rowId, setRowId] = React.useState<string | null>(null);
  const [refreshChatbot, setRefreshChatbot] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string | null>(null);
  const [openRenameModal, setOpenRenameModal] = React.useState<boolean>(false);
  const [openInactiveModal, setOpenInactiveModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState<any>();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [chatbotToaster, setChatbotToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [qrPages, setQrPages] = React.useState<number>(0);
  const [qrCounts, setQrCounts] = React.useState<number>(0);
  const [openActiveModal, setOpenActiveModal] = React.useState<boolean>(false);

  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    handleClose();
    setRowId(selectedRow._id);
    setName(selectedRow.name);
    setOpenRenameModal(true);
  };

  const handleInactive = () => {
    handleClose();
    setRowId(selectedRow._id);
    setOpenInactiveModal(true);
  };

  const handleActive = () => {
    // console.log("Activate");
    handleClose();
    setRowId(selectedRow._id);
    setOpenActiveModal(true);
  };

  const handleDelete = () => {
    handleClose();
    setRowId(selectedRow._id);
    getAttachQrCount(selectedRow._id);
  };

  const getAttachQrCount = async (id: string) => {
    try {
      const result = await ChatbotServices.getAttachQrCount(id);
      if (result.success) {
        setQrCounts(result.data.totalChatbots);
        setOpenDeleteModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setOpenRenameModal(false);
    setOpenInactiveModal(false);
    setOpenDeleteModal(false);
    setOpenActiveModal(false);
    handleClose();
  };

  const handleRefresh = () => {
    setRefreshChatbot(!refreshChatbot);
  };

  // handle close toaster..
  const handleCloseToaster = () => {
    setChatbotToaster(null);
  };

  // Getting list of all chatbots
  const getAll = async () => {
    setApiLoading(true);
    try {
      const result = await ChatbotServices.getAllChatbot("", rowsPerPage, page);
      if (result.success) {
        const data = result.data;
        setChatbots(data);
        setApiLoading(false);
        // console.log(data);
      } else {
        // console.log("No data");
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
        setApiLoading(false);
      }
      // setLoading(false);
    } catch (error) {
      setChatbots(null);
      setApiLoading(false);
      // setLoading(false);
    }
  };

  // Getting count of pages
  const getAllPagesCount = async () => {
    setApiLoading(true);
    try {
      const allData = await ChatbotServices.getAllChatbot("", 0, 0);
      const pageLength = Math.ceil(allData.data.length / rowsPerPage);
      setQrPages(pageLength);
      setApiLoading(false);
      // setLoading(false);
    } catch (error) {
      setChatbots(null);
      setApiLoading(false);
      // setLoading(false);
    }
  };

  // for searchValue
  const getSearchChatbot = async () => {
    setApiLoading(true);
    try {
      console.log("TRIGGER");

      const result = await ChatbotServices.getAllChatbot(searchValue, 0, 0);
      if (result.success) {
        const data = result.data;
        console.log(data);
        setChatbots(data);
        setQrPages(1);
        setApiLoading(false);
        // console.log(data);
      } else {
        // console.log("No data");
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
        setApiLoading(false);
      }
      // setLoading(false);
    } catch (error) {
      setChatbots(null);
      setApiLoading(false);
      // setLoading(false);
    }
  };

  // create chatbots
  const createChatbot = async () => {
    setButtonDisabled(true);
    const flowData = {
      nodes: [],
      edges: [],
    };
    const date_now = new Date();
    const month_calculate = Number(date_now.getMonth()) + 1;
    //generate random bot name
    const chatbotName =
      "Bot-" + date_now.getDate() + "-" + month_calculate + "-" + date_now.getTime();

    setApiLoading(true);
    const result = await ChatbotServices.postChatbot(chatbotName, flowData);
    if (result) {
      if (result.success && result.data._id) {
        router.push("/dashboard/chatbot/" + result.data._id);
        setApiLoading(false);
      } else {
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
      }
      setApiLoading(false);
    } else {
      setChatbotToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
      setApiLoading(false);
    }
    setButtonDisabled(false);
  };
  React.useEffect(() => {
    getAllPagesCount();
    getAll();
  }, []);

  // Refreshing page on every action
  React.useEffect(() => {
    if (searchValue === "") {
      getAllPagesCount();
    }
  }, [refreshChatbot, rowsPerPage, searchValue]);

  const debouncedSearch = React.useCallback(
    debounce(() => {
      getSearchChatbot();
    }, 800),
    [getSearchChatbot],
  );

  // Refreshhing list on rows per page or page change
  React.useEffect(() => {
    if (searchValue === "") {
      getAll();
    } else if (searchValue !== "") {
      debouncedSearch();
    }
    return () => debouncedSearch.cancel();
  }, [rowsPerPage, page, searchValue, refreshChatbot]);

  return (
    <>
      <Box sx={{ p: "0" }}>
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
              autoComplete="off"
              sx={{
                marginRight: "1rem",
                flex: 1,
                minWidth: "100px",
                borderRadius: "8px",
              }}
              onChange={(e) => setSearchValue(e.target.value)}
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
              disabled={buttonDisabled}
              // onClick={() => router.push("/dashboard/chatbot/create")}
              onClick={() => createChatbot()}
            >
              <Image width={24} height={24} src={chatboticon} alt="QrCodeIcon" />
              <Typography sx={{ color: "#fff" }}>Create Chatbot</Typography>
            </Button>
          </Box>
        </Box>

        {/* {loading ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          </>
        ) : (
          <> */}
        {chatbots && (
          <>
            <TableContainer
              sx={{
                bgcolor: "#fff",
                borderRadius: "10px",
                height: "calc(100vh - 230px)",
                overflow: "auto",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ top: 0, position: "sticky", zIndex: 1, backgroundColor: "#fff" }}>
                  <TableRow>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }}>#</TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Chatbot List
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Created On
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Updated on
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Total Chats
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Open Chats
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Finished
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Status
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} align="left">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chatbots &&
                    chatbots.map((row, index) => (
                      <TableRow
                        key={row._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "16px", fontWeight: "600" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => router.push(`/dashboard/chatbot/${row._id}`)}
                          sx={{ cursor: "pointer" }}
                        >
                          <b>{row.name}</b>
                        </TableCell>
                        <TableCell align="left">
                          <ConvertTime defaultTime={row.createdAt} type="dateTime" /> SGT
                        </TableCell>
                        <TableCell align="left">
                          {row.updatedAt ? (
                            <ConvertTime defaultTime={row.updatedAt} type="dateTime" />
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="left">{row.totalChats}</TableCell>
                        <TableCell align="left">{row.openChats}</TableCell>
                        <TableCell align="left">{row.finishChats}</TableCell>
                        <TableCell align="left">
                          <Box
                            sx={{
                              color: "#fff",
                              py: "5px",
                              width: "80px",
                              px: "12px",
                              textAlign: "center",
                              borderRadius: "40px",
                            }}
                            bgcolor={row.status ? "#00A206" : "#B0B0B0"}
                          >
                            {row.status ? "Active" : "Inactive"}
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(event) => handleClick(event, row)}
                            sx={{ color: "#000", minWidth: "0", padding: "0" }}
                          >
                            <MoreHorizIcon />
                          </Button>
                        </TableCell>
                        <Menu
                          onClick={() => setSelectedRow(row)}
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          PaperProps={{
                            style: {
                              boxShadow: "none",
                              border: "1px solid #d9d9d9",
                              borderRadius: "4px",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              router.push(`/dashboard/chatbot/${selectedRow._id}`);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem onClick={handleRename}>Rename</MenuItem>
                          {selectedRow && selectedRow.status ? (
                            <MenuItem onClick={handleInactive}>Inactive Bot</MenuItem>
                          ) : (
                            <MenuItem onClick={handleActive}>Active Bot</MenuItem>
                          )}
                          <MenuItem
                            sx={{
                              color: "#FF4F4F",
                            }}
                            onClick={handleDelete}
                          >
                            Delete Bot
                          </MenuItem>
                        </Menu>
                      </TableRow>
                    ))}

                  <TableRow>
                    <TableCell colSpan={9}>
                      <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "16px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "18px",
                              fontWeight: 400,
                              lineHeight: "30px",
                            }}
                          >
                            Rows per page:
                          </Typography>
                          <FormControl variant="standard">
                            <Select
                              labelId="demo-customized-select-label"
                              id="demo-customized-select"
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                            >
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={25}>25</MenuItem>
                              <MenuItem value={50}>50</MenuItem>
                              <MenuItem value={100}>100</MenuItem>
                            </Select>
                          </FormControl>
                          <Stack spacing={2}>
                            <Pagination
                              count={qrPages}
                              variant="outlined"
                              shape="rounded"
                              onChange={handleChangePage}
                            />
                          </Stack>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {/* </>
        )} */}
        {apiLoading && <LoaderGlobal />}
      </Box>
      {/* <LoaderGlobal /> */}
      {openRenameModal && (
        <RenameChatbotModal
          open={openRenameModal}
          onClose={handleCloseModal}
          refreshChatbot={handleRefresh}
          chatbotId={rowId}
          name={name}
        />
      )}
      {openInactiveModal && (
        <InactiveBot
          open={openInactiveModal}
          onClose={handleCloseModal}
          refreshChatbot={handleRefresh}
          chatbotId={rowId}
        />
      )}
      {openActiveModal && (
        <ActiveBot
          open={openActiveModal}
          onClose={handleCloseModal}
          refreshChatbot={handleRefresh}
          chatbotId={rowId}
        />
      )}
      {openDeleteModal && (
        <DeleteBot
          open={openDeleteModal}
          onClose={handleCloseModal}
          refreshChatbot={handleRefresh}
          chatbotId={rowId}
          qrCounts={qrCounts}
        />
      )}
      {chatbotToaster && (
        <Toaster
          open={chatbotToaster.open}
          severity={chatbotToaster.severity}
          onClose={handleCloseToaster}
          message={chatbotToaster.message}
        />
      )}
    </>
  );
};

export default Chatbotlisting;
