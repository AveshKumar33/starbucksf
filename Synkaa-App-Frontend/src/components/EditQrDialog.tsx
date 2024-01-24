import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
// import Table from "@/assets/images/table.svg";
import Close from "@/assets/images/close.svg";
import QrCodeIconWhite from "@/assets/images/qrCodeIcon.svg";
import QrCodeIcon from "@/assets/images/qrCodeIcon-2.svg";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import QRGenerator from "@/components/QrCodeGenrator";
import QrTableServices from "@/services/qrtable.service";
import Toaster from "@/components/Toaster";
import { DeleteQR } from "@/components/DeletQRPopup";
import LoaderGlobal from "./LoaderGlobal";
import ChatbotServices from "@/services/chatbot.services";
import RobotIcon from "@/assets/images/robotIcon.svg";

interface SimpleDialogProps {
  qrName: string;
  chatbotId: string;
  scale: number;
  qrNumber: string;
  open: boolean;
  selectedValue: string;
  status: boolean;
  onClose: any;
  qrId: string;
  refreshPage: () => void;
  chatbotName: string;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

export function EditQrCodeDialog(props: SimpleDialogProps) {
  const {
    qrName,
    chatbotId,
    scale,
    qrNumber,
    onClose,
    selectedValue,
    open,
    qrId,
    status,
    refreshPage,
    chatbotName,
  } = props;
  const admin = localStorage.getItem("Admin");
  const [newTableName, setNewTableName] = React.useState<string>(qrName);
  const [newChatbotId, setNewChatbotId] = React.useState<string>(chatbotId);
  const [statusValue, setStatusValue] = React.useState(status);
  const [error, setError] = React.useState("");
  const [deletePopup, setDeletePopup] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [updateToaster, setUpdateToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [allChatbots, setAllChatbots] = React.useState<any>(null);
  const [adminNumber, setAdminNumber] = React.useState<string | null>(null);
  const [newChatbotName, setNewChatbotName] = React.useState<string>(chatbotName);

  const handleClose = () => {
    setError("");
    onClose(selectedValue);
    setDeletePopup(false);
    setIsButtonDisabled(false);
  };
  const handleValueChange = (event: any) => {
    setError("");
    setNewTableName(event.target.value);
    setIsButtonDisabled(false);
  };

  const getChatbotName = (chatbotId: string) => {
    setNewChatbotName("");
    return new Promise((resolve, reject) => {
      ChatbotServices.getChatbotDetail(chatbotId)
        .then((result) => {
          if (result.success) {
            resolve(result.data.name);
          } else {
            reject(new Error("Failed to get chatbot details"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleChatbotChange = async (event: any) => {
    setNewChatbotId(event.target.value);
    const name = (await getChatbotName(event.target.value)) as string;
    setNewChatbotName(name);
    setIsButtonDisabled(false);
  };

  const handleStatusChange = (statusData: boolean) => {
    setStatusValue(!statusData);
    setIsButtonDisabled(false);
  };

  const handleUpdateQr = async () => {
    setError("");
    setIsButtonDisabled(true);
    if (newTableName && newTableName !== "") {
      setApiLoading(true);
      try {
        const response = await QrTableServices.updateQr(
          newTableName,
          newChatbotId,
          scale,
          qrNumber,
          qrId,
          statusValue,
        );
        if (response.success) {
          setNewTableName("");
          setUpdateToaster({
            open: true,
            severity: "success",
            message: "Qr updated successfully",
          });
          refreshPage();
          setTimeout(() => {
            handleClose();
          }, 500);
        } else {
          setUpdateToaster({
            open: true,
            severity: "success",
            message: response.message,
          });
        }
      } catch (error) {
        setNewTableName("");
        setIsButtonDisabled(false);
        setUpdateToaster({
          open: true,
          severity: "error",
          message: "Error occurred, try again",
        });
        setApiLoading(false);
      }
    } else {
      setError("Qr name can not be empty");
    }
  };
  const handleCloseToaster = () => {
    setError("");
    setIsButtonDisabled(false);
    setUpdateToaster(null);
  };

  const handleDelete = () => {
    setDeletePopup(true);
  };

  const allChatbot = async () => {
    setApiLoading(true);
    try {
      const result = await ChatbotServices.getAllChatbot("", 0, 0);
      if (result.success) {
        const filterActiveBots = result.data.filter((chatbot: any) => chatbot.status === true);
        setAllChatbots(filterActiveBots);
      } else {
        setAllChatbots(null);
      }
    } catch (error) {
      setAllChatbots(null);
    }
    setApiLoading(false);
  };

  React.useEffect(() => {
    allChatbot();
  }, []);

  React.useEffect(() => {
    if (admin) {
      const adminData = JSON.parse(admin);
      setAdminNumber(adminData.phoneNumber);
    }
  }, []);

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        {apiLoading && <LoaderGlobal />}
        <Box sx={{ p: "32px", minWidth: "436px" }}>
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              mb: "26px",
              justifyContent: "space-between",
            }}
          >
            <Typography>Edit QR</Typography>
            <Button onClick={handleClose}>
              <Image width={24} height={24} src={Close} alt="Close" />
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center", mb: "16px" }}>
            <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
            <Typography>
              QR Name <span style={{ color: "red" }}>*</span>
            </Typography>
          </Box>
          <Box>
            <TextField
              autoComplete="off"
              sx={{ width: "100%", borderRadius: "4px", height: "40px" }}
              label="Enter QR Name"
              value={newTableName}
              onChange={handleValueChange}
            />
          </Box>
          {error && (
            <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center", mt: "32px" }}>
            <Image width={24} height={24} src={RobotIcon} alt="ChatbotIcon" />
            <Typography>
              Chatbot <span style={{ color: "red" }}>*</span>
            </Typography>
          </Box>
          {allChatbots ? (
            <>
              <FormControl sx={{ width: "100%", borderRadius: "4px", mt: "16px" }}>
                <InputLabel id="demo-multiple-checkbox-label">Select Chatbot</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newChatbotId}
                  label="Select Chatbot"
                  onChange={handleChatbotChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: "200px",
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  {allChatbots.map((chatbot: any) => (
                    <MenuItem key={chatbot._id} value={chatbot._id}>
                      {chatbot.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <Typography sx={{ color: "red" }}>
              No chatbots added yet, please add one and try again
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              mt: "32px",
              justifyContent: "space-between",
            }}
          >
            <Typography>Status</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                checked={statusValue}
                label="Active"
                labelPlacement="bottom"
                onChange={() => handleStatusChange(statusValue)}
              />
            </FormGroup>
          </Box>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center", mt: "20px" }}>
            <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
            <Typography variant="h5" sx={{ fontWeight: "600", color: "#4A4A4A" }}>
              Preview
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              mt: "10px",
              bgcolor: "#F4F4F4",
              p: "14px",
              justifyContent: "center",
              borderRadius: "12px",

              overflow: "hidden",
            }}
          >
            {adminNumber && newChatbotName && (
              <QRGenerator
                scale={scale}
                inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/landing?admin=${adminNumber}&qrName=${qrName}&chatbotId=${chatbotId}&chatbotName=${newChatbotName}`}
                qrId={qrNumber}
                setQrId={null}
              />
            )}
          </Box>
          <Button
            onClick={handleUpdateQr}
            sx={{
              bgcolor: "#008DF1",
              gap: "10px",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
              borderRadius: "4px",
              width: "100%",
              mt: "32px",
            }}
            variant="contained"
            disabled={isButtonDisabled}
          >
            <Image width={24} height={24} src={QrCodeIconWhite} alt="QrCodeIcon" />
            <Typography sx={{ color: "#fff" }}>Update QR</Typography>
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              bgcolor: "transparent",
              gap: "10px",
              borderRadius: "4px",
              width: "100%",
              mt: "32px",
              border: "1px solid",
              borderColor: "#FF7676",
            }}
            variant="outlined"
          >
            <Typography sx={{ color: "#FF4F4F" }}>Delete QR</Typography>
          </Button>
        </Box>
      </Dialog>
      {updateToaster && (
        <Toaster
          open={updateToaster.open}
          severity={updateToaster.severity}
          onClose={handleCloseToaster}
          message={updateToaster.message}
        />
      )}
      {deletePopup && (
        <DeleteQR
          open={deletePopup}
          qrName={newTableName}
          qrId={qrId}
          onClose={handleClose}
          refreshPage={refreshPage}
        />
      )}
    </>
  );
}
