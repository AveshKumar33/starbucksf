import { Box, Button, Dialog, Typography } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Toaster from "./Toaster";
import TagsServices from "@/services/tags.services";
import UserServices from "@/services/user.service";
import LoaderGlobal from "./LoaderGlobal";

interface DeleteTagModalType {
  open: boolean;
  onClose: () => void;
  selectedTag: string;
  refreshPage: () => void;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

const DeleteTagModal: React.FC<DeleteTagModalType> = ({
  open,
  onClose,
  selectedTag,
  refreshPage,
}) => {
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [userCount, setUserCount] = React.useState("");
  const [deleteToaster, setDeleteToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const handleClose = () => {
    onClose();
  };

  const handleCloseToaster = () => {
    setButtonDisabled(false);
    setDeleteToaster(null);
  };

  async function countUsers() {
    const userCountResult: any = await UserServices.getUserCount(selectedTag);
    setUserCount(userCountResult.data.totalUsers);
  }
  countUsers();
  const handleDeleteTag = async () => {
    setButtonDisabled(true);
    setApiLoading(false);
    try {
      const result = await TagsServices.deleteTag(selectedTag);
      if (result.success) {
        setDeleteToaster({
          open: true,
          severity: "success",
          message: "Contacts deleted successfully",
        });
        refreshPage();
        setTimeout(() => {
          handleClose();
        }, 500);
      } else {
        setButtonDisabled(false);
        setDeleteToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setButtonDisabled(false);
      setDeleteToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
    }

    setApiLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {apiLoading && <LoaderGlobal />}
        <Box
          sx={{
            maxWidth: "410px",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            padding: "32px",
            borderRadius: "10px",
          }}
        >
          {/* <Image src={DeleteIcon} alt='DELETE' /> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "20px",
                my: "16px",
                textAlign: "center",
              }}
            >
              Confirmation
            </Typography>
            <Box onClick={handleClose}>
              <ClearIcon />
            </Box>
          </Box>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#707070",
              pb: "16px",
            }}
          >
            Are you sure you want to delete this tag?
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              color: "#1F1F1F",
              pb: "16px",
            }}
          >
            The tag your are trying to delete has already been associated with {userCount}{" "}
            customers.
            <br /> Deleting this will remove the tags from every customer.
          </Typography>
          {/* <Typography
          variant="caption"
          sx={{ fontWeight: "500", fontSize: "16px", letterSpacing: "-0.384px", color: "#1F1F1F" }}
        >
          The tag your are trying to delete has already been associated with 7 customers. Deleting
          this will also remove the tags from each customer.
        </Typography> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              pt: "32px",
              width: "100%",
              gap: "16px",
            }}
          >
            <Button
              id="basic-button"
              aria-haspopup="true"
              // variant="contained"
              disableElevation
              disabled={buttonDisabled}
              size="large"
              sx={{
                backgroundColor: "#FF4F4F",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#FF4F4F" },
              }}
              onClick={handleDeleteTag}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Dialog>
      {deleteToaster && (
        <Toaster
          open={deleteToaster.open}
          severity={deleteToaster.severity}
          onClose={handleCloseToaster}
          message={deleteToaster.message}
        />
      )}
    </>
  );
};

export default DeleteTagModal;
