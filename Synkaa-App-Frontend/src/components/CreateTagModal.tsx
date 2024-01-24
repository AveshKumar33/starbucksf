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

interface CreateTagModalTypes {
  open: boolean;
  onClose: () => void;
  refreshTags: () => void;
}

const CreateTagModal: React.FC<CreateTagModalTypes> = ({ open, onClose, refreshTags }) => {
  const [tagValue, setTagValue] = React.useState<string>("");
  const [addTagToaster, setAddTagToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const handleTagValueChange = (e: any) => {
    setTagValue(e.target.value);
  };

  const saveTag = async () => {
    setApiLoading(true);
    try {
      const result = await TagsServices.postTag(tagValue);
      if (result.success) {
        setAddTagToaster({
          open: true,
          severity: "success",
          message: "Tag Saved Successfully",
        });
        refreshTags();
        setTimeout(() => {
          handleClose();
        }, 500);
      } else {
        setAddTagToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setAddTagToaster({
        open: true,
        severity: "error",
        message: "Error occured try again",
      });
    }
    setApiLoading(false);
  };

  const handleCloseToaster = () => {
    setAddTagToaster(null);
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
              Create Tag
            </Typography>
            <Typography onClick={handleClose}>
              <CloseIcon />
            </Typography>
          </Box>
          <TextField
            sx={{
              width: "100%",
              borderRadius: "4px",
              height: "40px",
              marginTop: "16px",
              marginBottom: "32px",
            }}
            autoComplete="off"
            type="text"
            onChange={handleTagValueChange}
          ></TextField>
          <Button
            id="basic-button"
            aria-haspopup="true"
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
            onClick={saveTag}
          >
            Create Tag
          </Button>
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

export default CreateTagModal;
