import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Box, Typography } from '@mui/material';

interface QRGeneratorProps {
  onGenerate: any;
  scale: number; // New prop for the scale
  inputValue:string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ onGenerate, scale, inputValue }) => {
  const [qrImage, setQrImage] = useState('');
  // const [inputValue] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {

    const new_date = new Date();
    const timestamp = new_date.getTime();
    // Generate a unique ID in octal, only once when the component mounts
    const uniqueId = Math.floor(Math.random() * timestamp).toString(6).padStart(6, '0');
    setId(uniqueId);
    generateQR(uniqueId, scale);
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Generate a new QR code whenever the scale changes
    generateQR(id, scale);
  }, [scale]); // Scale in the dependency array

  const generateQR = async (uniqueId: string, scale: number) => {
    try {
      const response = await QRCode.toDataURL(inputValue, { scale }); // scale is added here
      setQrImage(response);
      onGenerate(uniqueId, response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {qrImage && <img src={qrImage} alt={`QR Code ${id}`} />}
      <Typography>{id}</Typography>
    </Box>
  );
};

export default QRGenerator;
