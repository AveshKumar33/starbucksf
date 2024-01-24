import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import QRCode from "qrcode";
import { Box, Typography } from "@mui/material";

interface DownloadQRProps {
  scale: number;
  inputValue: string;
  qrId: string;
  qrName: string;
}

export interface DownloadQRRef {
  downloadImage: () => void;
}

const DownloadQr: React.ForwardRefRenderFunction<DownloadQRRef, DownloadQRProps> = (
  { scale, inputValue, qrId, qrName },
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

  const handleDownload = () => {
    if (qrImage) {
      const downloadLink = document.createElement("a");
      downloadLink.href = qrImage;
      downloadLink.download = `Qr_Name_${qrName}.png`; // Change the filename as needed
      downloadLink.click();
    }
  };

  useImperativeHandle(ref, () => ({
    downloadImage: handleDownload,
  }));

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

export default forwardRef(DownloadQr);
