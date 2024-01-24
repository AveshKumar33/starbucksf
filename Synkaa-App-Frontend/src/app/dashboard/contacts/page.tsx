"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
// import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Paper,
  TextField,
  InputAdornment,
  Box,
  // CircularProgress,
  FormControl,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import AddTagModal from "@/components/AddTagModal";
import UserServices from "@/services/user.service";
import { DeleteConfirmation } from "@/components/DeleteContactModal";
import { utils, writeFile } from "xlsx";
import { ConvertTime } from "@/components/ConvertTime";
import LoaderGlobal from "@/components/LoaderGlobal";
import Tooltip from "@mui/material/Tooltip";
import { debounce } from "lodash";
// import { TagFacesOutlined } from "@mui/icons-material";
// import CommonData from "@/types/common.type";

interface Data {
  id: number;
  phonenumber: number;
  latestvist: number;
  createdon: number;
  name: string;
  tags: string;
  add: string;
}

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "phonenumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "createdon",
    numeric: true,
    disablePadding: false,
    label: "Created On",
  },
  {
    id: "latestvist",
    numeric: true,
    disablePadding: false,
    label: "Latest Visit",
  },
  {
    id: "tags",
    numeric: true,
    disablePadding: false,
    label: "Tags",
  },
  {
    id: "add",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line no-unused-vars
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount /*onRequestSort*/ } = props;

  return (
    <TableHead sx={{ top: 0, position: "sticky", zIndex: 1, backgroundColor: "#fff" }}>
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
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "600", fontSize: "16px" }}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            > */}
            {headCell.label}
            {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface TagsData {
  name: string;
  _id: string;
}

interface UsersInfo {
  _id: string | null;
  uuid: string;
  name: string;
  userNumberId: string;
  phoneNumber: string;
  tagslist: [TagsData];
  createdAt: string;
  updatedAt: string;
}

const Contact: React.FC = () => {
  // const [loading, setLoading] = React.useState(false);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<[UsersInfo] | null>(null);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("phonenumber");
  const [selected, setSelected] = React.useState<any>([]);
  const [dense] = React.useState(false);
  const [addTagModal, setAddTagModal] = React.useState(false);
  const [rowId, setRowId] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [selectedTags, setSelectedTags] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [qrPages, setQrPages] = React.useState<number>(0);

  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Refreshing contact list on actions
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handling click of select all checkboxes
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (users) {
      if (event.target.checked) {
        const newSelected = users.map((n) => n._id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    }
  };

  // Handling click of respective checkobox
  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    const selectedIndex = selected.indexOf(row._id);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row._id);
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

  // Opening add tag modal for contacts
  const handleAddTagModal = (id: string | null, tagList: any) => {
    if (id) {
      setRowId(id);
      setSelectedTags(tagList);
      setAddTagModal(true);
    }
  };

  // Closing add tag modal for contacts
  const handleCloseTagModal = () => {
    setAddTagModal(false);
    setRowId(null);
  };

  // Opening delete contact popup
  const handleDeleteContacts = () => {
    if (selected) {
      setOpenDeleteModal(true);
    }
  };

  // Closing delete popup for contacts
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const isSelected = (row: any) => selected.indexOf(row._id) !== -1;

  // Getting all contacts data from database
  async function getAllUserData() {
    setApiLoading(true);
    try {
      setAddTagModal(false);
      setRowId(null);
      const usersData: any = await UserServices.getAll("", rowsPerPage, page);
      const contactList = usersData.data;
      const removeHans = contactList.filter(function (data: any) {
        return data.role !== "Admin";
      });
      setUsers(removeHans);
      setApiLoading(false);
      // setLoading(false);
    } catch (error) {
      setUsers(null);
      setApiLoading(false);
      console.log(error);
      // setLoading(false);
    }
  }

  async function getUserPageCount() {
    setApiLoading(true);
    try {
      const usersData: any = await UserServices.getAll("", 0, 0);
      const contactList = usersData.data;
      const removeHans = contactList.filter(function (data: any) {
        return data.role !== "Admin";
      });
      const pageLength = Math.ceil(removeHans.length / rowsPerPage);
      setQrPages(pageLength);
      setApiLoading(false);
    } catch (error) {
      setUsers(null);
      // setLoading(false);
      setApiLoading(false);
    }
  }

  async function getSearchUsers() {
    setApiLoading(true);
    try {
      setAddTagModal(false);
      setRowId(null);
      const usersData: any = await UserServices.getAll(searchValue, 0, 0);
      const contactList = usersData.data;
      const removeHans = contactList.filter(function (data: any) {
        return data.role !== "Admin";
      });
      setUsers(removeHans);
      setQrPages(1);
      setApiLoading(false);
    } catch (error) {
      setUsers(null);
      setApiLoading(false);
      console.log(error);
      // setLoading(false);
    }
  }

  // Exporting contacts into excel format
  const handleContactExport = () => {
    setApiLoading(true);
    let exportedContact: any[] = [];
    if (users) {
      selected.map((contactId: string) => {
        const filteredUsers = users.filter((user) => user._id?.includes(contactId));
        exportedContact.push(filteredUsers);
      });
    }
    let data: any = [];
    exportedContact.map((contactDetail, index) =>
      contactDetail.map((contact: any) => {
        if (contact.tagslist && contact.tagslist.length > 0) {
          const tagList = contact.tagslist.map((tag: any) => tag.name).join(", ");

          if (data.length === 0) {
            data.push({
              "S. No.": 1,
              Name: contact.name,
              "Phone Number": `+${contact.phoneNumber}`,
              Tags: tagList,
            });
          } else {
            data.push({
              "S. No.": index + 1,
              Name: contact.name,
              "Phone Number": `+${contact.phoneNumber}`,
              Tags: tagList,
            });
          }
        } else {
          if (data.length === 0) {
            data.push({
              "S. No.": 1,
              Name: contact.name,
              "Phone Number": `+${contact.phoneNumber}`,
              Tags: "",
            });
          } else {
            data.push({
              "S. No.": index + 1,
              Name: contact.name,
              "Phone Number": `+${contact.phoneNumber}`,
              Tags: "",
            });
          }
        }
      }),
    );
    const excel_date = new Date();
    const monthAbbreviation = excel_date.toLocaleString("default", { month: "short" });
    const day = excel_date.getDate();
    const year = excel_date.getFullYear();
    const hours = excel_date.getHours().toString().padStart(2, "0");
    const minutes = excel_date.getMinutes().toString().padStart(2, "0");
    const formattedString = `${day}-${monthAbbreviation}-${year}_${hours}-${minutes}`;
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `Contact_Export_${formattedString}.xlsx`);
    setApiLoading(false);
  };

  const debouncedSearch = React.useCallback(
    debounce(() => {
      getSearchUsers();
    }, 800),
    [getSearchUsers],
  );

  React.useEffect(() => {
    if (searchValue === "") {
      getAllUserData();
    } else if (searchValue !== "") {
      debouncedSearch();
    }
    return () => debouncedSearch.cancel();
  }, [searchValue, refresh, page, rowsPerPage]);

  React.useEffect(() => {
    if (searchValue === "") {
      getUserPageCount();
    }
  }, [searchValue, rowsPerPage, refresh]);

  // React.useEffect(() => {
  //   return () => {
  //     setLoading(true);
  //   };
  // }, []);

  return (
    <>
      {apiLoading && <LoaderGlobal />}
      <Box sx={{ p: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
        <Box sx={{ width: "100%", mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <Toolbar
            sx={{
              px: "32px",
              py: "24px",
              marginBottom: "24px",
              ...(selected.length > 0 && {}),
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: "72px",
            }}
          >
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%", fontWeight: "600" }}
                color="inherit"
                variant="h6"
                component="div"
              >
                Contact List
              </Typography>
            ) : (
              <Typography
                sx={{ flex: "1 1 100%", fontWeight: "600" }}
                color="inherit"
                variant="h6"
                component="div"
              >
                Contact List
              </Typography>
            )}
            {selected.length > 0 ? (
              <Box sx={{ display: "flex" }}>
                <TextField
                  autoComplete="off"
                  sx={{ marginRight: ".5rem", flex: 1, minWidth: "200px", borderRadius: "8px" }}
                  placeholder="Search"
                  size="small"
                  inputProps={{ "aria-label": "search google maps" }}
                  onKeyUp={(e) => {
                    // setLoading(false);
                    setSearchValue((e.target as HTMLInputElement).value);
                    // setLoading(false);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  className="disable_btn"
                  disableElevation
                  onClick={handleContactExport}
                  startIcon={<IosShareIcon />}
                  sx={{ marginRight: ".5rem", borderRadius: "8px", height: "36px" }}
                >
                  Export
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "8px", height: "36px" }}
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteContacts}
                >
                  Delete
                </Button>
              </Box>
            ) : (
              <Paper
                elevation={0}
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              >
                <Box sx={{ display: "flex" }}>
                  <TextField
                    autoComplete="off"
                    sx={{
                      marginRight: ".5rem",
                      flex: 1,
                      minWidth: "200px",
                      borderRadius: "8px",
                    }}
                    placeholder="Search"
                    size="small"
                    onKeyUp={(e) => {
                      // setLoading(false);
                      setSearchValue((e.target as HTMLInputElement).value);
                      // setLoading(false);
                    }}
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
                    variant="contained"
                    className="disable_btn"
                    disabled
                    disableElevation
                    startIcon={<IosShareIcon />}
                    onClick={handleContactExport}
                    sx={{
                      marginRight: ".5rem",
                      backgroundColor: "#83CAFD",
                      borderRadius: "8px",
                      height: "36px",
                    }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleDeleteContacts}
                    sx={{ borderRadius: "8px", height: "36px" }}
                    disabled
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            )}
          </Toolbar>
          {/* {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <> */}
          {users && (
            <>
              <TableContainer
                sx={{
                  backgroundColor: "#fff",
                  height: "calc(100vh - 204px)",
                  overflow: "auto",
                }}
              >
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  {users && (
                    <>
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={users.length}
                      />
                    </>
                  )}

                  <TableBody>
                    {users.length > 0 && (
                      <>
                        {users.map((row: any, index: number) => {
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow key={index} hover tabIndex={-1}>
                              {row && row._id && (
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    onClick={(event) => handleClick(event, row)}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                              )}
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                sx={{
                                  fontWeight: "600",
                                  fontSize: "16px",
                                  padding: "16px",
                                }}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="left">
                                {row.phoneNumber && `+${row.phoneNumber}`}
                              </TableCell>
                              <TableCell align="left">
                                <ConvertTime defaultTime={row.createdAt} type="dateTime" />
                              </TableCell>
                              <TableCell align="left">
                                {row.updatedAt && (
                                  <ConvertTime defaultTime={row.updatedAt} type="dateTime" />
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {row && (
                                  <Stack direction="row" spacing={1}>
                                    {row?.tagslist && row.tagslist.length > 0 ? (
                                      <>
                                        {row.tagslist.length <= 2 ? (
                                          <>
                                            {row.tagslist.map((item: any, index: number) => {
                                              return (
                                                <Chip
                                                  label={item.name}
                                                  key={index}
                                                  sx={{ maxWidth: "150px", height: "auto" }}
                                                />
                                              );
                                            })}
                                          </>
                                        ) : (
                                          <>
                                            {row.tagslist
                                              .slice(0, 2)
                                              .map((item: any, index: number) => {
                                                return (
                                                  <Chip
                                                    label={item.name}
                                                    key={index}
                                                    sx={{ maxWidth: "150px", height: "auto" }}
                                                  />
                                                );
                                              })}
                                            <Tooltip
                                              sx={{ position: "relative" }}
                                              title={
                                                <div
                                                  style={{
                                                    position: "absolute",
                                                    top: 5,
                                                    left: 0,
                                                    minWidth: "175px",
                                                    height: "auto",
                                                    padding: "8px",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    borderRadius: "4px 0px 4px 4px",
                                                    background: "#FFF",
                                                    boxShadow:
                                                      "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
                                                  }}
                                                >
                                                  {row.tagslist
                                                    .slice(2)
                                                    .map((tag: any, index: number) => (
                                                      <Typography
                                                        key={index}
                                                        sx={{
                                                          color: "#707070",
                                                          fontSize: "14px",
                                                          fontWeight: 500,
                                                          lineHeight: "20px",
                                                          paddingBottom: "10px",
                                                          paddingLeft: "8px",
                                                        }}
                                                      >
                                                        {tag.name}
                                                      </Typography>
                                                    ))}
                                                </div>
                                              }
                                              placement="bottom-start"
                                            >
                                              <Chip label={`+${row.tagslist.length - 2} more`} />
                                            </Tooltip>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      "Please add tag"
                                    )}
                                  </Stack>
                                )}
                              </TableCell>
                              <TableCell
                                align="left"
                                onClick={() => handleAddTagModal(row._id, row.tagslist)}
                                sx={{ cursor: "pointer" }}
                              >
                                <AddIcon sx={{ color: "#707070" }} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}

                    {/* {emptyRows > 0 && (
                          <TableRow
                            key={0}
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )} */}
                    <TableRow>
                      <TableCell colSpan={7}>
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
          {/* <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"`
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  /> */}
        </Box>
        {/* <FormControlLabel
  control={<Switch checked={dense} onChange={handleChangeDense} />}
  label="Dense padding"
/> */}
        {addTagModal && (
          <AddTagModal
            open={addTagModal}
            onClose={handleCloseTagModal}
            rowId={rowId}
            refreshPage={handleRefresh}
            tagList={selectedTags}
          />
        )}
        {openDeleteModal && (
          <DeleteConfirmation
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            selectedContacts={selected}
            refreshPage={handleRefresh}
          />
        )}
      </Box>
    </>
  );
};

export default Contact;
