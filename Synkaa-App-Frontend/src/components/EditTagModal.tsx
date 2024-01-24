import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import TagsServices from "@/services/tags.services";
import Toaster from "./Toaster";
import LoaderGlobal from "./LoaderGlobal";

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

interface EditTagModalTypes {
  open: boolean;
  onClose: () => void;
  refreshTags: () => void;
  value: string;
  rowId: string | null;
}

const EditTagModal: React.FC<EditTagModalTypes> = ({
  open,
  onClose,
  refreshTags,
  value,
  rowId,
}) => {
  const [tagValue, setTagValue] = React.useState<string>(value);
  const [updateTagToaster, setUpdateTagToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const handleTagValueChange = (e: any) => {
    setTagValue(e.target.value);
  };

  const updateTag = async () => {
    setApiLoading(true);
    try {
      if (rowId) {
        const result = await TagsServices.updateTag(rowId, tagValue);
        if (result.success) {
          setUpdateTagToaster({
            open: true,
            severity: "success",
            message: "Tag Edited Successfully",
          });
          refreshTags();
          setTimeout(() => {
            handleClose();
          }, 500);
        } else {
          setUpdateTagToaster({
            open: true,
            severity: "error",
            message: result.message,
          });
        }
      }
    } catch (error) {
      setUpdateTagToaster({
        open: true,
        severity: "error",
        message: "Error occured try again",
      });
    }
    setApiLoading(false);
  };

  const handleCloseToaster = () => {
    setUpdateTagToaster(null);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        {apiLoading && <LoaderGlobal />}
        <Box
          sx={{
            minWidth: "410px",
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
              Update Tag
            </Typography>
            <Typography onClick={handleClose}>
              <CloseIcon />
            </Typography>
          </Box>
          <TextField
            autoComplete="off"
            value={tagValue}
            sx={{
              width: "100%",
              borderRadius: "4px",
              height: "40px",
              marginTop: "16px",
              marginBottom: "32px",
            }}
            type="text"
            onChange={handleTagValueChange}
          ></TextField>
          <Button
            id="basic-button"
            aria-haspopup="true"
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
            onClick={updateTag}
          >
            Update Tag
          </Button>
        </Box>
      </Dialog>
      {updateTagToaster && (
        <Toaster
          open={updateTagToaster.open}
          severity={updateTagToaster.severity}
          onClose={handleCloseToaster}
          message={updateTagToaster.message}
        />
      )}
    </>
  );
};

export default EditTagModal;
