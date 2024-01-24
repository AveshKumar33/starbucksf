import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from "next/image";
import Table from "../../../../src/assets/images/table.svg";
import HighQualityIcon from "../../../../src/assets/images/highQualityIcon.svg";
import QrCodeIconWhite from "../../../../src/assets/images/qrCodeIcon.svg";
import QrCodeIcon from "../../../../src/assets/images/qrCodeIcon-2.svg";
import Slider from '@mui/material/Slider';
import QRGenerator from './QrCodeGenerator';

 interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: any;
}

export function SimpleDialog(props: SimpleDialogProps) {
    const [qrSize, setQrSize] = useState<number>(4)
    const [tableNumber] = useState<number>();
    const handleChange = (event: any, newValue: any) => {
        setQrSize(newValue);
    };
    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };
    const handleQRGeneration = (id: string, qrCode: string) => {
        console.log(`QR Code Generated - ID: ${id}, QR Code: ${qrCode}`);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ p: "32px", minWidth: "436px" }}>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mb: "16px" }}>
                    <Image width={24} height={24} src={Table} alt="Table" />
                    <Typography>Table No</Typography>
                </Box>
                <Box >
                    <TextField sx={{ width: "100%", borderRadius: "4px",height:"40px" }} label="Enter Table Number" />
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "32px" }}>
                    <Image width={24} height={24} src={HighQualityIcon} alt="HighQualityIcon" />
                    <Typography>Resolution</Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Slider onChange={handleChange} value={qrSize} size="medium" aria-label="Small" valueLabelDisplay="auto" max={9} min={4} />
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "20px" }}>
                    <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
                    <Typography>Preview</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "10px", bgcolor: "#F4F4F4", py: "14px", justifyContent: "center", borderRadius: "12px", height: "200px", overflow: "hidden" }}>
                    <QRGenerator onGenerate={handleQRGeneration} scale={qrSize} inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/landing?tablenumber=${tableNumber}`}/>
                </Box>
                <Button sx={{
                    bgcolor: "#008DF1",
                    gap: "10px",
                    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
                    borderRadius: "4px",
                    width: "100%",
                    mt: "32px",
                }}
                    variant="contained">
                    <Image width={24} height={24} src={QrCodeIconWhite} alt="QrCodeIcon" />
                    <Typography sx={{ color: "#fff" }}>Generate QR</Typography>
                </Button>
                <Button onClick={handleClose} sx={{
                    bgcolor: "transparent",
                    gap: "10px",
                    borderRadius: "4px",
                    width: "100%",
                    mt: "32px",
                    border: "1px solid",
                    borderColor: "#ACACAC"
                }}
                    variant="outlined">
                    <Image width={24} height={24} src={QrCodeIconWhite} alt="QrCodeIcon" />
                    <Typography sx={{ color: "#000" }}>Cancel</Typography>
                </Button>
            </Box>

        </Dialog>
    );
}

export function DialogBox() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog
                selectedValue={""}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}