import React, { useState, useEffect, forwardRef } from "react";
import QRCode from "qrcode";
import { Box, Typography } from "@mui/material";

interface PrintQRProps {
  scale: number;
  inputValue: string;
  qrId: string;
}

export interface PrintQRRef {}

const PrintQR: React.ForwardRefRenderFunction<PrintQRRef, PrintQRProps> = (
  { scale, inputValue, qrId },
  ref,
) => {
  const [qrImage, setQrImage] = useState("");

  const generateQR = async (currentScale: any) => {
    try {
      const response = await QRCode.toDataURL(inputValue, { scale: currentScale });
      setQrImage(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQR(scale);
  }, [scale]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} ref={ref}>
      {qrImage && <img src={qrImage} alt={`QR Code ${qrId}`} />}
      <Typography>{qrId}</Typography>
    </Box>
  );
};

export default forwardRef(PrintQR);
