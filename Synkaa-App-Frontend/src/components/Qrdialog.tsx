import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import HighQualityIcon from "@/assets/images/highQualityIcon.svg";
import QrCodeIconWhite from "@/assets/images/qrCodeIcon.svg";
import QrCodeIcon from "@/assets/images/qrCodeIcon-2.svg";
import Slider from "@mui/material/Slider";
import QRGenerator from "@/components/QrCodeGenrator";
import QrTableServices from "@/services/qrtable.service";
import Toaster from "@/components/Toaster";
import LoaderGlobal from "./LoaderGlobal";
import ChatbotServices from "@/services/chatbot.services";
import RobotIcon from "@/assets/images/robotIcon.svg";

interface QrDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: any;
  refresh: null | (() => void);
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

export function QrDialog(props: QrDialogProps) {
  const admin = localStorage.getItem("Admin");
  const [qrId, setQrId] = useState("");
  const [qrSize, setQrSize] = useState<number>(4);
  const [error, setError] = useState("");
  const [tableName, setTableName] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [toaster, setToaster] = useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);
  const [allChatbots, setAllChatbots] = useState<any>(null);
  const [chatbotError, setChatbotError] = useState<string | null>(null);
  const { onClose, selectedValue, open, refresh } = props;
  const [adminNumber, setAdminNumber] = React.useState<string | null>(null);
  const [chatbotName, setChatbotName] = React.useState<string>("");

  const getChatbotName = (chatbotId: string) => {
    setChatbotName("");
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

  const handleSelectChatbotChange = async (event: SelectChangeEvent) => {
    setIsButtonDisabled(false);
    setSelectedChatbot(event.target.value);
    const name = (await getChatbotName(event.target.value)) as string;
    setChatbotName(name);
  };

  const handleChange = (event: any, newValue: any) => {
    setIsButtonDisabled(false);
    setQrSize(newValue);
  };

  const handleQrIdChange = (newValue: string) => {
    setIsButtonDisabled(false);
    setQrId(newValue);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsButtonDisabled(false);
    const inputValue = event.target.value;
    setTableName(inputValue);
  };

  const handleClose = () => {
    onClose(selectedValue);
    setError("");
    setTableName(null);
    setSelectedChatbot(null);
    setIsButtonDisabled(false);
    setChatbotError(null);
  };

  const handleSubmit = async () => {
    setError("");
    setIsButtonDisabled(true);
    if (tableName !== null) {
      if (selectedChatbot !== null) {
        setApiLoading(true);
        try {
          const response = await QrTableServices.postQr(tableName, qrSize, qrId, selectedChatbot);
          if (response.success) {
            setTableName(null);
            setToaster({
              open: true,
              severity: "success",
              message: "QR generated successfully",
            });
            refresh !== null && refresh();
            handleClose();
          } else if (!response.success) {
            setError(response.message);
          }
        } catch (error) {
          setTableName(null);
          setIsButtonDisabled(false);
          setToaster({
            open: true,
            severity: "error",
            message: "Error occurred, try again",
          });
        }
        setApiLoading(false);
      } else {
        setChatbotError("Please select a chatbot");
      }
    } else {
      setError("Qr name can not be empty");
    }
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

  const handleCloseToaster = () => {
    setIsButtonDisabled(false);
    setError("");
    setToaster(null);
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
                  value={selectedChatbot ? selectedChatbot : ""}
                  label="Select Chatbot"
                  onChange={handleSelectChatbotChange}
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
          {chatbotError && (
            <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
              {chatbotError}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center", mt: "32px" }}>
            <Image width={24} height={24} src={HighQualityIcon} alt="HighQualityIcon" />
            <Typography>Resolution</Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Slider
              onChange={handleChange}
              value={qrSize}
              size="medium"
              aria-label="Small"
              valueLabelDisplay="auto"
              max={9}
              min={4}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center", mt: "20px" }}>
            <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
            <Typography>Preview</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              mt: "10px",
              bgcolor: "#F4F4F4",
              py: "14px",
              justifyContent: "center",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <QRGenerator
              scale={qrSize}
              qrId={qrId}
              setQrId={handleQrIdChange}
              inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/landing?admin=${adminNumber}&qrName=${tableName}&chatbotId=${selectedChatbot}&chatbotName=${chatbotName}`}
            />
          </Box>
          <Button
            onClick={handleSubmit}
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
            <Typography sx={{ color: "#fff" }}>Generate QR</Typography>
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "transparent",
              gap: "10px",
              borderRadius: "4px",
              width: "100%",
              mt: "32px",
              border: "1px solid",
              borderColor: "#ACACAC",
            }}
            variant="outlined"
          >
            <Image width={24} height={24} src={QrCodeIconWhite} alt="QrCodeIcon" />
            <Typography sx={{ color: "#000" }}>Cancel</Typography>
          </Button>
        </Box>
      </Dialog>
      {toaster && (
        <Toaster
          open={toaster.open}
          severity={toaster.severity}
          onClose={handleCloseToaster}
          message={toaster.message}
        />
      )}
    </>
  );
}
