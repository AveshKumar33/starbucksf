import Dialog from "@mui/material/Dialog";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Close from "@/assets/images/close.svg";
import QRGenerator from "@/components/QrCodeGenrator";

interface SimpleDialogProps {
  qrName: string;
  scale: number;
  qrNumber: string;
  chatbotId: string;
  open: boolean;
  selectedValue: string;
  onClose: any;
  chatbotName: string;
}

export default function PreviewQrCodeDialog(props: SimpleDialogProps) {
  const admin = localStorage.getItem("Admin");
  const { onClose, selectedValue, open, qrNumber, scale, qrName, chatbotId, chatbotName } = props;
  const [adminNumber, setAdminNumber] = React.useState<string | null>(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  React.useEffect(() => {
    if (admin) {
      const adminData = JSON.parse(admin);
      setAdminNumber(adminData.phoneNumber);
    }
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
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
          <Typography>Preview</Typography>
          <Button onClick={handleClose}>
            <Image width={24} height={24} src={Close} alt="Close" />
          </Button>
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
          {adminNumber && (
            <QRGenerator
              scale={scale}
              inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/landing?admin=${adminNumber}&qrName=${qrName}&chatbotId=${chatbotId}&chatbotName=${chatbotName}`}
              qrId={qrNumber}
              setQrId={null}
            />
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
