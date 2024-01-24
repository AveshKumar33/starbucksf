import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Toaster from "./Toaster";
import ChatbotServices from "@/services/chatbot.services";

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

interface CreateTagModalTypes {
  open: boolean;
  onClose: () => void;
  refreshChatbot: () => void;
  name: string | null;
  chatbotId: string | null;
}

const RenameChatbotModal: React.FC<CreateTagModalTypes> = ({
  open,
  onClose,
  refreshChatbot,
  name,
  chatbotId,
}) => {
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [botname, setBotname] = React.useState<string | null>(name);
  const [renameBotToaster, setRenameBotToaster] = React.useState<ToasterInterface | null>(null);

  const handleTagValueChange = (e: any) => {
    setBotname(e.target.value);
  };

  const updateBotname = async () => {
    setButtonDisabled(true);
    try {
      if (chatbotId && botname) {
        const result = await ChatbotServices.updateChatbotName(chatbotId, botname);
        if (result.success) {
          setRenameBotToaster({
            open: true,
            severity: "success",
            message: "Chatbot renamed successfully",
          });
          onClose();
        } else {
          setRenameBotToaster({
            open: true,
            severity: "error",
            message: result.message,
          });
          onClose();
        }
        refreshChatbot();
      } else {
        setRenameBotToaster({
          open: true,
          severity: "error",
          message: "Name cannot be empty",
        });
      }
    } catch (error) {
      setRenameBotToaster({
        open: true,
        severity: "error",
        message: "Error occured try again",
      });
      onClose();
    }
    setButtonDisabled(false);
  };

  const handleCloseToaster = () => {
    setRenameBotToaster(null);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
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
              Rename
            </Typography>
            <Typography onClick={handleClose}>
              <CloseIcon />
            </Typography>
          </Box>
          <TextField
            value={botname}
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
            disabled={buttonDisabled}
            onClick={updateBotname}
          >
            Confirm
          </Button>
        </Box>
      </Dialog>
      {renameBotToaster && (
        <Toaster
          open={renameBotToaster.open}
          severity={renameBotToaster.severity}
          onClose={handleCloseToaster}
          message={renameBotToaster.message}
        />
      )}
    </>
  );
};

export default RenameChatbotModal;
