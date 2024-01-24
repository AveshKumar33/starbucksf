"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Pagination,
  Stack,
} from "@mui/material";
import { QrDialog } from "@/components/Qrdialog";
import Image from "next/image";
import QrCodeIcon from "@/assets/images/qrCodeIcon.svg";
import EditPencil from "@/assets/images/editPencil.svg";
import Print from "@/assets/images/print.svg";
import Eye from "@/assets/images/eye.svg";
import Download from "@/assets/images/download.svg";
import QrTableServices from "@/services/qrtable.service";
import PreviewQrCodeDialog from "@/components/PreviewQrCode";
import { GetQrData } from "@/types/qr.types";
import { EditQrCodeDialog } from "@/components/EditQrDialog";
import { useReactToPrint } from "react-to-print";
import PrintQR from "@/components/PrintQR";
import DownloadQR, { DownloadQRRef } from "@/components/DownloadQR";
import { ConvertTime } from "@/components/ConvertTime";
import LoaderGlobal from "@/components/LoaderGlobal";
import { Tooltip } from "react-tooltip";
import "@/assets/styles/tooltip.scss";
import ChatbotServices from "@/services/chatbot.services";

const QrCode = () => {
  const admin = localStorage.getItem("Admin");
  const componentRef = React.useRef(null);
  const downloadRef = React.useRef<DownloadQRRef | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  // const [loading, setLoading] = React.useState<boolean>(true);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [allQr, setAllQr] = React.useState<any>();
  const [selectedQr, setSelectedQr] = React.useState<GetQrData>();
  const [previewQr, setPreviewQr] = React.useState<boolean>(false);
  const [editQr, setEditQr] = React.useState<boolean>(false);
  const [refreshQr, setRefreshQr] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [qrPages, setQrPages] = React.useState<number>(0);
  const [adminNumber, setAdminNumber] = React.useState<string | null>(null);
  const [chatbotName, setChatbotName] = React.useState<string>("");

  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleRefresh = () => {
    setRefreshQr(!refreshQr);
  };

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

  const handlePreviewQr = async (row: GetQrData) => {
    setSelectedQr(row);
    const name = (await getChatbotName(row.chatbotId)) as string;
    setChatbotName(name);
    setPreviewQr(true);
    setEditQr(false);
  };

  const handleEditQr = async (row: GetQrData) => {
    // console.log("ROWWWWWWWWWWWWWWWWWWWWWWWWW", row);
    setPreviewQr(false);
    setSelectedQr(row);
    const name = (await getChatbotName(row.chatbotId)) as string;
    setChatbotName(name);
    setEditQr(true);
  };

  const handlePrint = async (row: GetQrData) => {
    setPreviewQr(false);
    setEditQr(false);
    setSelectedQr(row);
    const name = (await getChatbotName(row.chatbotId)) as string;
    setChatbotName(name);
    setTimeout(() => {
      printQRImage();
    }, 1000);
  };

  const printQRImage = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = async (row: GetQrData) => {
    setSelectedQr(row);
    const name = (await getChatbotName(row.chatbotId)) as string;
    setChatbotName(name);
    setTimeout(() => {
      downloadQr();
    }, 1000);
  };

  const downloadQr = () => {
    if (downloadRef.current) {
      downloadRef.current.downloadImage();
    }
  };

  const handleClose = () => {
    setSelectedQr(undefined);
    setPreviewQr(false);
    setEditQr(false);
  };

  async function getAllQrData() {
    // setLoading(true);
    setApiLoading(true);
    try {
      const allData = await QrTableServices.getAllQr(rowsPerPage, page);
      setAllQr(allData.data);
      setApiLoading(false);
      // setLoading(false);
    } catch (error) {
      setAllQr(null);
      // setLoading(false);
      setApiLoading(false);
    }
  }

  async function getQrPages() {
    setApiLoading(true);
    try {
      const allData = await QrTableServices.getAllQr(0, 0);
      const pageLength = Math.ceil(allData.data.length / rowsPerPage);
      setQrPages(pageLength);
      setApiLoading(false);
    } catch (error) {
      setAllQr(null);
      setApiLoading(false);
      // setLoading(false);
    }
  }

  React.useEffect(() => {
    if (admin) {
      const adminData = JSON.parse(admin);
      setAdminNumber(adminData.phoneNumber);
    }
  }, []);

  React.useEffect(() => {
    getQrPages();
  }, [refreshQr, rowsPerPage]);

  React.useEffect(() => {
    getAllQrData();
  }, [rowsPerPage, page, refreshQr]);

  // React.useEffect(() => {
  //   return () => {
  //     setLoading(true);
  //   };
  // }, []);

  return (
    <div>
      {apiLoading && <LoaderGlobal />}
      <Box sx={{ p: "0" }}>
        <Box
          sx={{
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "24px",
            px: "32px",
            py: "24px",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>QR Codes</Typography>
          <Button
            onClick={handleClickOpen}
            sx={{
              bgcolor: "#008DF1",
              gap: "10px",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            variant="contained"
          >
            <Image width={24} height={24} src={QrCodeIcon} alt="QrCodeIcon" />
            <Typography sx={{ color: "#fff" }}>Create QR</Typography>
          </Button>
        </Box>
        <QrDialog
          selectedValue={""}
          open={open}
          onClose={handleClickOpen}
          refresh={handleRefresh}
        />
        {/* {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 230px)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <> */}
        {allQr && (
          <>
            <TableContainer
              sx={{
                bgcolor: "#fff",
                borderRadius: "10px",
                height: "calc(100vh - 230px)",
                overflow: "auto",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ top: 0, position: "sticky", zIndex: 1, backgroundColor: "#fff" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Created On</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 700 }}>
                      QR Code
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 700 }}>
                      QR Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      Status
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tooltip-design">
                  {allQr && (
                    <>
                      {allQr.map((row: any) => (
                        <TableRow
                          key={row.createdAt}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                            <ConvertTime defaultTime={row.createdAt} type="date" />
                          </TableCell>
                          <TableCell align="left" sx={{ fontWeight: 700 }}>
                            {row.qrcodeNumber}
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{row.qrName}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                color: "#fff",
                                py: "5px",
                                width: "80px",
                                m: "0 auto",
                                px: "12px",
                                textAlign: "center",
                                borderRadius: "40px",
                              }}
                              bgcolor={row.status ? "#00A206" : "#B0B0B0"}
                            >
                              {row.status ? "Active" : "Inactive"}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ gap: "16px", display: "flex", justifyContent: "center" }}>
                              <Image
                                width={24}
                                height={24}
                                src={Eye}
                                alt="Eye"
                                onClick={() => handlePreviewQr(row)}
                                style={{ cursor: "pointer" }}
                                data-tooltip-id="qrcode-tooltip"
                                data-tooltip-content="Preview"
                              />
                              <Image
                                width={24}
                                height={24}
                                src={EditPencil}
                                alt="EditPencil"
                                onClick={() => handleEditQr(row)}
                                style={{ cursor: "pointer" }}
                                data-tooltip-id="qrcode-tooltip"
                                data-tooltip-content="Edit"
                              />
                              <Image
                                width={24}
                                height={24}
                                src={Print}
                                alt="Print"
                                onClick={() => handlePrint(row)}
                                style={{ cursor: "pointer" }}
                                data-tooltip-id="qrcode-tooltip"
                                data-tooltip-content="Print"
                              />
                              {selectedQr && adminNumber && chatbotName && (
                                <div style={{ display: "none" }}>
                                  <PrintQR
                                    scale={selectedQr.scaling}
                                    inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/landing?admin=${adminNumber}&qrName=${selectedQr.qrName}&chatbotId=${selectedQr.chatbotId}&chatbotName=${chatbotName}`}
                                    qrId={selectedQr.qrcodeNumber}
                                    ref={componentRef}
                                  />
                                </div>
                              )}
                              <Image
                                width={24}
                                height={24}
                                src={Download}
                                alt="Download"
                                onClick={() => handleDownload(row)}
                                style={{ cursor: "pointer" }}
                                data-tooltip-id="qrcode-tooltip"
                                data-tooltip-content="Download"
                              />
                              {selectedQr && adminNumber && chatbotName && (
                                <div style={{ display: "none" }}>
                                  <DownloadQR
                                    scale={selectedQr.scaling}
                                    inputValue={`${process.env.NEXT_PUBLIC_BASE_URL}/landing?admin=${adminNumber}&qrName=${selectedQr.qrName}&chatbotId=${selectedQr.chatbotId}&chatbotName=${chatbotName}`}
                                    qrId={selectedQr.qrcodeNumber}
                                    ref={downloadRef}
                                    qrName={selectedQr.qrName}
                                  />
                                </div>
                              )}
                            </Box>
                          </TableCell>
                          <Tooltip id="qrcode-tooltip" className="common-tooltip" place="bottom" />
                        </TableRow>
                      ))}
                    </>
                  )}
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "16px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "18px",
                              fontWeight: 400,
                              lineHeight: "30px",
                            }}
                          >
                            Rows per page:
                          </Typography>
                          <FormControl variant="standard">
                            <Select
                              labelId="demo-customized-select-label"
                              id="demo-customized-select"
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                            >
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={25}>25</MenuItem>
                              <MenuItem value={50}>50</MenuItem>
                              <MenuItem value={100}>100</MenuItem>
                            </Select>
                          </FormControl>
                          <Stack spacing={2}>
                            <Pagination
                              count={qrPages}
                              variant="outlined"
                              shape="rounded"
                              onChange={handleChangePage}
                            />
                          </Stack>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {/* </>
        )} */}
      </Box>
      {selectedQr && chatbotName && (
        <>
          {previewQr && (
            <PreviewQrCodeDialog
              scale={selectedQr.scaling}
              qrName={selectedQr.qrName}
              qrNumber={selectedQr.qrcodeNumber}
              open={previewQr}
              selectedValue={selectedQr.qrcodeNumber}
              chatbotId={selectedQr.chatbotId}
              onClose={handleClose}
              chatbotName={chatbotName}
            />
          )}
          {editQr && (
            <EditQrCodeDialog
              status={selectedQr.status}
              refreshPage={handleRefresh}
              scale={selectedQr.scaling}
              qrName={selectedQr.qrName}
              chatbotId={selectedQr.chatbotId}
              qrNumber={selectedQr.qrcodeNumber}
              open={editQr}
              selectedValue={selectedQr._id}
              onClose={handleClose}
              qrId={selectedQr._id}
              chatbotName={chatbotName}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QrCode;
