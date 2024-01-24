import Dialog from '@mui/material/Dialog';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from "next/image";
import Close from "../../../../src/assets/images/close.svg";
import QRGenerator from '../atoms/QrCodeGenerator';

interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: any;
}

export function PreviewQrCodeDialog(props: SimpleDialogProps) {
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
                    <Typography  variant="h5" sx={{fontWeight:'600', color:'#4A4A4A'}}>Preview</Typography>
                    <Button onClick={handleClose}>
                        <Image width={24} height={24} src={Close} alt="Close" />
                    </Button>
                </Box>
                <Box sx={{ display: "flex", gap: "6px", alignItems: 'center', mt: "10px", bgcolor: "#F4F4F4", py: "14px", justifyContent: "center", borderRadius: "12px", height: "200px", overflow: "hidden" }}>
                    <QRGenerator onGenerate={handleQRGeneration} scale={qrSize} inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/landing#tableno=${tableNumber}`} />
                </Box>
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
            <PreviewQrCodeDialog
                selectedValue={""}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}