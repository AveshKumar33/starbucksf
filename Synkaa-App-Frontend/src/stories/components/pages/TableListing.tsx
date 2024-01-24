/* eslint-disable no-undef */
import theme from "../../../theme/theme";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Header } from "../organisms/Header";
import { SideBar } from "../organisms/SideBar";
import QrCodeIcon from "../../../../src/assets/images/qrCodeIcon.svg";
import EditPencil from "../../../../src/assets/images/editPencil.svg";
import Print from "../../../../src/assets/images/print.svg";
import Eye from "../../../../src/assets/images/eye.svg";
import Download from "../../../../src/assets/images/download.svg";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SimpleDialog } from "../atoms/DialogBox";
import { EditQrCodeDialog } from "../organisms/EditQrDialog";
import { PreviewQrCodeDialog } from "../organisms/PreviewQrCode";


function createData(
    date: string,
    qrCode: number,
    tableNo: number,
    status: "Active" | "Error",
) {
    return { date, qrCode, tableNo, status };
}

const rows = [
    createData('23/06/2023', 237384940, 1, "Active"),
    createData('23/06/2023', 237384940, 2, "Error"),
    createData('23/06/2023', 237384940, 3, "Active"),
    createData('23/06/2023', 237384940, 4, "Error"),
    createData('23/06/2023', 237384940, 5, "Active"),
    createData('23/06/2023', 237384940, 6, "Error"),
    createData('23/06/2023', 237384940, 7, "Active"),
    createData('23/06/2023', 237384940, 8, "Error"),
    createData('23/06/2023', 237384940, 9, "Active"),
];

export const TableListing: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [editQrOpen, setEditQrOpen] = React.useState<boolean>(false);
    const [previewQrOpen, setPreviewQrOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };
    const handleEditQr = () => {
        setEditQrOpen(!editQrOpen);
    };
    const handlePreviewQr = () => {
        setPreviewQrOpen(!previewQrOpen);
    };
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", width: "100%", height: "100vh", flexGrow: "1", bgcolor: "#F0F6FE", }}>
                <Box sx={{ flexBasis: "60px" }}>
                    <SideBar />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Header heading="Table QR Generator" dashBoard={false} />
                    <Box sx={{ p: "24px" , marginTop: '68px' }}>
                        <Box sx={{ bgcolor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px", px: "32px", py: "24px", borderRadius: "10px" }}>
                            <Typography>Active QR</Typography>
                            <Button onClick={handleClickOpen} sx={{ bgcolor: "#008DF1", gap: "10px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);", borderRadius: "4px" }} variant="contained">
                                <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
                                <Typography sx={{ color: "#fff" }}>Create QR</Typography>
                            </Button>
                        </Box>
                        <SimpleDialog
                            selectedValue={""}
                            open={open}
                            onClose={handleClickOpen}
                        />
                        <TableContainer sx={{ bgcolor: "#fff", borderRadius: "10px" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Created On</TableCell>
                                        <TableCell align="left">QR Code</TableCell>
                                        <TableCell align="left" >Table Number</TableCell>
                                        <TableCell align="center" ><Box>Status</Box></TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.tableNo}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.date}</TableCell>
                                            <TableCell align="left">{row.qrCode}</TableCell>
                                            <TableCell align="left"><Typography >{row.tableNo}</Typography></TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ color: "#fff", py: "5px", width: "60px", m: "0 auto", px: "12px", borderRadius: "40px" }}
                                                    bgcolor={row.status === "Active" ? "#00A206" : "#B0B0B0"}>{row.status}</Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ gap: "16px", display: "flex", justifyContent: "center" }}>
                                                    <Button onClick={handlePreviewQr} sx={{ bgcolor: "transparent", width: "24px", height: "24px", padding: "0px", minWidth: "0px" }}>
                                                        <Image width={24} height={24} src={Eye} alt="Eye" />
                                                    </Button>
                                                    <PreviewQrCodeDialog
                                                        selectedValue={""}
                                                        open={previewQrOpen}
                                                        onClose={handlePreviewQr}
                                                    />
                                                    <Button onClick={handleEditQr} sx={{ bgcolor: "transparent", width: "24px", height: "24px", padding: "0px", minWidth: "0px" }}>
                                                        <Image src={EditPencil} alt="EditPencil" />
                                                    </Button>
                                                    <EditQrCodeDialog
                                                        selectedValue={""}
                                                        open={editQrOpen}
                                                        onClose={handleEditQr}
                                                    />
                                                    <Image width={24} height={24} src={Print} alt="Print" />
                                                    <Image width={24} height={24} src={Download} alt="Download" />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
