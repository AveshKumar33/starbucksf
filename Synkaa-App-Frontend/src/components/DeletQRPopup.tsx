import { Box, Button, Dialog, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import DeleteIcon from "@/assets/images/delete-icon.svg";
import Toaster from "@/components/Toaster";
import QrTableServices from "@/services/qrtable.service";
import LoaderGlobal from "./LoaderGlobal";

interface DeleteQrProps {
  qrName: string;
  qrId: string;
  onClose: () => void;
  refreshPage: () => void;
  open: boolean;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

export const DeleteQR = (props: DeleteQrProps) => {
  const { qrName, qrId, onClose, refreshPage, open } = props;
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [deleteToaster, setDeleteToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);

  const handleDelete = async () => {
    setIsButtonDisabled(true);
    setApiLoading(true);
    try {
      const response = await QrTableServices.deleteQr(qrId);
      if (response.success) {
        refreshPage();
        setDeleteToaster({
          open: true,
          severity: "success",
          message: "Qr deleted successfully",
        });
        handleClose();
      } else if (!response.success) {
        setDeleteToaster({
          open: true,
          severity: "error",
          message: response.message,
        });
      }
    } catch (error) {
      setDeleteToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
    }
    setApiLoading(false);
  };

  const handleClose = () => {
    setIsButtonDisabled(false);
    onClose();
  };

  const handleCloseToaster = () => {
    setIsButtonDisabled(false);
    setDeleteToaster(null);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        {apiLoading && <LoaderGlobal />}
        <Box
          sx={{
            maxWidth: "410px",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <Image src={DeleteIcon} alt="DELETE" />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "20px",
              my: "16px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete <br /> this QR Code?
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontWeight: "700", fontSize: "14px", color: "#9C9C9C" }}
          >
            You have selected QR <br />
            {qrName}
          </Typography>
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
              disabled={isButtonDisabled}
              onClick={handleDelete}
              id="basic-button"
              aria-haspopup="true"
              variant="contained"
              disableElevation
              size="large"
              sx={{ backgroundColor: "#FF4F4F", width: "100%" }}
            >
              Delete
            </Button>
            <Button
              onClick={handleClose}
              id="basic-button"
              aria-haspopup="true"
              variant="outlined"
              disableElevation
              size="large"
              sx={{ color: "#5B5B5B", border: "1px solid #5B5B5B", width: "100% " }}
            >
              Cancel
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
