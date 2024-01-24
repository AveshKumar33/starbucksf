import { Box, Button, Dialog, Typography } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Toaster from "./Toaster";
import ChatbotServices from "@/services/chatbot.services";

interface DeleteTagModalType {
  open: boolean;
  onClose: () => void;
  chatbotId: string | null;
  refreshChatbot: () => void;
  qrCounts: number;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

const DeleteBot: React.FC<DeleteTagModalType> = ({
  open,
  onClose,
  chatbotId,
  refreshChatbot,
  qrCounts,
}) => {
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [deleteToaster, setDeleteToaster] = React.useState<ToasterInterface | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleCloseToaster = () => {
    setButtonDisabled(false);
    setDeleteToaster({
      open: false,
      severity: "info",
      message: "Hello, world!",
    });
  };

  const handleInactiveBot = async () => {
    setButtonDisabled(true);
    if (chatbotId) {
      const result = await ChatbotServices.deleteChatbot(chatbotId);
      if (result.success) {
        setDeleteToaster({
          open: true,
          severity: "success",
          message: "Chatbot deleted successfully",
        });
        onClose();
      } else {
        setDeleteToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
      }
      refreshChatbot();
    }
    setButtonDisabled(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: "410px",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "32px",
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
          <Box>
            {qrCounts === 0 ? (
              <>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#707070",
                    pb: "16px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  Are you sure you want to delete this chatbot?
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
                  If you wish to continue, all the data will be deleted permanently.
                </Typography>
              </>
            ) : (
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
                This chatbot is attached to {qrCounts} Qr Code. If you wish to continue, all the
                data will be deleted permanently and attached Qr will not function with chatbot.
              </Typography>
            )}
          </Box>
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
              onClick={handleInactiveBot}
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

export default DeleteBot;
