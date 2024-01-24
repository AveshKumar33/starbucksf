import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from "next/image";
import Table from "../../../../src/assets/images/table.svg";
import Close from "../../../../src/assets/images/close.svg";
import QrCodeIconWhite from "../../../../src/assets/images/qrCodeIcon.svg";
import QrCodeIcon from "../../../../src/assets/images/qrCodeIcon-2.svg";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import QRGenerator from '../atoms/QrCodeGenerator';

interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: any;
}

export function EditQrCodeDialog(props: SimpleDialogProps) {
    const [qrSize] = useState<number>(4)
    const [tableNumber] = useState<number>();
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

                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mb: "26px", justifyContent: "space-between" }}>
                    <Typography>Edit QR</Typography>
                    <Button onClick={handleClose}>
                        <Image width={24} height={24} src={Close} alt="Close" />
                    </Button>
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mb: "16px" }}>
                    <Image width={24} height={24} src={Table} alt="Table" />
                    <Typography>Table No</Typography>
                </Box>
                <Box >
                    <TextField sx={{ width: "100%", borderRadius: "4px", height: "40px" }} label="Enter Table Number" />
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "32px", justifyContent: "space-between" }}>
                    <Typography>Status</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} label="Active" labelPlacement="bottom" />
                    </FormGroup>
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "20px" }}>
                    <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
                    <Typography  variant="h5" sx={{fontWeight:'600', color:'#4A4A4A'}}>Preview</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "10px", bgcolor: "#F4F4F4", py: "14px", justifyContent: "center", borderRadius: "12px", height: "200px", overflow: "hidden" }}>
                    <QRGenerator onGenerate={handleQRGeneration} scale={qrSize} inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/landing#tableno=${tableNumber}`} />
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
                    <Typography sx={{ color: "#fff" }}>Update QR</Typography>
                </Button>
                <Button onClick={handleClose} sx={{
                    bgcolor: "transparent",
                    gap: "10px",
                    borderRadius: "4px",
                    width: "100%",
                    mt: "32px",
                    border: "1px solid",
                    borderColor: "#FF7676"
                }}
                    variant="outlined">
                    <Typography sx={{ color: "#FF4F4F" }}>Delete QR</Typography>
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
            <EditQrCodeDialog
                selectedValue={""}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}