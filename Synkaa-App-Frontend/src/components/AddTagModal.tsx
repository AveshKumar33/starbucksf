import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  Stack,
  Chip,
  Checkbox,
  FormControl,
  ListItemText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import TagsServices from "@/services/tags.services";
import ContactServices from "@/services/contacts.services";
import Toaster from "./Toaster";
import LoaderGlobal from "./LoaderGlobal";
import ClearIcon from "@mui/icons-material/Clear";

interface AddTagModalTypes {
  open: boolean;
  onClose: () => void;
  rowId: string | null;
  refreshPage: () => void;
  tagList: any[];
}

interface GetTagData {
  _id: string;
  name: string;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddTagModal: React.FC<AddTagModalTypes> = ({
  open,
  onClose,
  rowId,
  refreshPage,
  tagList,
}) => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [allTagData, setAllTagData] = useState<GetTagData[]>([]);
  const [addTagToaster, setAddTagToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);

  // handling click on checkbox
  const handleCheckedChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    setSelectedTags(event.target.value as string[]);
  };

  // getting all tags from backend
  const getAllTags = async () => {
    setApiLoading(true);
    try {
      let defaultTagList: string[] = [];
      if (tagList && tagList.length > 0) {
        tagList.map((tag) => defaultTagList.push(tag.name));
      }
      setSelectedTags(defaultTagList);
      const allTagData = await TagsServices.getAllTags();
      const data: GetTagData[] = allTagData.data;
      setAllTagData(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
    setApiLoading(false);
  };

  // Adding selected tag to respective contact
  const handleAddTagToContact = async () => {
    setApiLoading(true);
    const selectedTagIds = selectedTags.map((tagName) => {
      const selectedTag = allTagData.find((tag) => tag.name === tagName);
      return selectedTag?._id;
    });
    if (rowId && selectedTagIds) {
      try {
        const result = await ContactServices.updateContactTag(rowId, selectedTagIds);
        if (result) {
          if (result.success) {
            setAddTagToaster({
              open: true,
              severity: "success",
              message: "Contact tag updated successfully",
            });
            refreshPage();
            handleClose();
          } else {
            setAddTagToaster({
              open: true,
              severity: "error",
              message: result.message,
            });
          }
        } else {
          setAddTagToaster({
            open: true,
            severity: "error",
            message: "Some error occured",
          });
        }
      } catch (error) {
        setAddTagToaster({
          open: true,
          severity: "error",
          message: "Some error occured",
        });
      }
    }
    setApiLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  // Display of already added tags
  const handleTagDisplayDelete = (tag: string) => {
    // Filtering array of all tags with the tag Name to delete
    const filterTags = selectedTags.filter(
      (tagName) => tagName.toLowerCase() !== tag.toLowerCase(),
    );
    setSelectedTags(filterTags);
  };

  const handleCloseToaster = () => {
    setAddTagToaster(null);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        {apiLoading && <LoaderGlobal />}
        <Box
          sx={{
            maxWidth: "410px",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "600", fontSize: "24px", lineHeight: "20px", my: "16px" }}
            >
              Add Tags
            </Typography>
            <Box onClick={handleClose} sx={{ cursor: "pointer" }}>
              <ClearIcon />
            </Box>
          </Box>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedTags}
              onChange={handleCheckedChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {allTagData.map((tag) => (
                <MenuItem key={tag._id} value={tag.name}>
                  <Checkbox checked={selectedTags.indexOf(tag.name) > -1} />
                  <ListItemText primary={tag.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {selectedTags &&
                selectedTags.length > 0 &&
                selectedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDisplayDelete(tag)}
                    style={{ margin: "5px" }}
                  />
                ))}
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: "16px",
              width: "100%",
              gap: "16px",
            }}
          >
            <Button
              id="basic-button"
              aria-haspopup="true"
              variant="contained"
              disableElevation
              size="large"
              sx={{ width: "100%" }}
              onClick={handleAddTagToContact}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
      {addTagToaster && (
        <Toaster
          open={addTagToaster.open}
          severity={addTagToaster.severity}
          onClose={handleCloseToaster}
          message={addTagToaster.message}
        />
      )}
    </>
  );
};

export default AddTagModal;
