"use client";
import { Box, Button, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@/assets/images/border_color.png";
import DeleteIcon from "@/assets/images/delete.png";
import Image from "next/image";
import TagsServices from "@/services/tags.services";
import CreateTagModal from "./CreateTagModal";
import EditTagModal from "./EditTagModal";
import DeleteTagModal from "./DeleteTagModal";
import LoaderGlobal from "./LoaderGlobal";
// import UserServices from "@/services/user.service";

interface GetTagData {
  _id: string;
  name: string;
}

const Managetags: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [allTagData, setAllTagData] = React.useState<GetTagData[] | null>(null);
  const [refreshTags, setRefreshTags] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [openEditTagModal, setOpenEditTagModal] = React.useState<boolean>(false);
  const [rowId, setRowId] = React.useState<string | null>(null);
  const [tagValue, setTagValue] = React.useState<string>("");
  const [tagId, setTagId] = React.useState<string>("");
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filterTags = useMemo(() => {
    if (allTagData === null) {
      return null;
    }

    if (!searchValue) {
      return allTagData;
    }

    if (allTagData) {
      const filteredUsers = allTagData.filter((tag) =>
        tag.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      return filteredUsers;
    }

    return null;
  }, [searchValue, allTagData]);

  const getAllTags = async () => {
    setApiLoading(true);
    try {
      const allTagData = await TagsServices.getAllTags();
      const data: GetTagData[] = allTagData.data;
      setAllTagData(data);
    } catch (error) {
      setAllTagData(null);
    }
    setApiLoading(false);
  };

  const handleRefresh = () => {
    setRefreshTags(!refreshTags);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddTagModal = () => {
    setOpenModal(true);
  };

  const handleEdit = (id: string, value: string) => {
    setRowId(id);
    setTagValue(value);
    setOpenEditTagModal(true);
  };

  const handleEditClose = () => {
    setRowId(null);
    setTagValue("");
    setOpenEditTagModal(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleTagDelete = async (id: string) => {
    setTagId(id);
    setDeleteModal(true);
  };

  React.useEffect(() => {
    getAllTags();
  }, [refreshTags]);

  return (
    <>
      {apiLoading && <LoaderGlobal />}
      <Box
        sx={{
          width: "100%",
          background: "white",
          borderRadius: "12px",
          height: "calc(100vh - 110px)",
          padding: "28px",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "24px",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
              Manage Tags
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "400", color: "#1C1B1F", fontSize: "14px" }}
            >
              Total Tags: {allTagData ? <>{allTagData.length}</> : "0"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              autoComplete="off"
              sx={{ marginRight: ".5rem", flex: 1, minWidth: "200px", borderRadius: "8px" }}
              placeholder="Search"
              size="small"
              onChange={(e) => handleSearch(e.target.value)}
              inputProps={{ "aria-label": "search google maps" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleAddTagModal}>
              Create Tags
            </Button>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: "24px" }} />
        {allTagData ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                // justifyContent: "space-between",
                gap: "12px",
              }}
            >
              {filterTags ? (
                <>
                  {filterTags?.map((data) => (
                    <Box
                      key={data._id}
                      sx={{
                        display: "flex",
                        padding: "16px",
                        justifyContent: "space-between",
                        border: "1px solid #D9D9D9",
                        borderRadius: "7px",
                        width: "32%",
                      }}
                    >
                      <Typography>{data.name}</Typography>
                      <Box>
                        <Image
                          onClick={() => handleEdit(data._id, data.name)}
                          style={{ marginRight: "10px" }}
                          src={EditIcon}
                          alt="QrCodeIcon"
                        />
                        <Image
                          src={DeleteIcon}
                          alt="QrCodeIcon"
                          onClick={() => handleTagDelete(data._id)}
                        />
                      </Box>
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  {allTagData?.map((data) => (
                    <Box
                      key={data._id}
                      sx={{
                        display: "flex",
                        padding: "16px",
                        justifyContent: "space-between",
                        border: "1px solid #D9D9D9",
                        borderRadius: "7px",
                        width: "32%",
                      }}
                    >
                      <Typography>{data.name}</Typography>
                      <Box>
                        <Image
                          style={{ marginRight: "10px" }}
                          src={EditIcon}
                          alt="QrCodeIcon"
                          onClick={() => handleEdit(data._id, data.name)}
                        />
                        <Image
                          src={DeleteIcon}
                          alt="QrCodeIcon"
                          onClick={() => handleTagDelete(data._id)}
                        />
                      </Box>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </>
        ) : (
          <p>No tags added</p>
        )}
        {openModal && (
          <CreateTagModal open={openModal} onClose={handleClose} refreshTags={handleRefresh} />
        )}
        {deleteModal && (
          <DeleteTagModal
            open={deleteModal}
            onClose={handleCloseDeleteModal}
            refreshPage={handleRefresh}
            selectedTag={tagId}
          />
        )}
        {openEditTagModal && (
          <EditTagModal
            open={openEditTagModal}
            onClose={handleEditClose}
            refreshTags={handleRefresh}
            value={tagValue}
            rowId={rowId}
          />
        )}
      </Box>
    </>
  );
};

export default Managetags;
