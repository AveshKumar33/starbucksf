import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import close from "@/assets/images/close.svg";
import comment from "@/assets/images/comment.svg";
import flagAmerica from "@/assets/images/flagAmerica.svg";
import flagSingapore from "@/assets/images/flagSinapore.svg";
import flagIndia from "@/assets/images/flagIndia.svg";
import threeDots from "@/assets/images/deleteIcon.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ChatbotServices from "@/services/chatbot.services";
import LoaderGlobal from "./LoaderGlobal";
import Toaster from "./Toaster";
import arrowLeft from "@/assets/images/arrowLeft.svg";
import { Controller, useForm } from "react-hook-form";
import UserServices from "@/services/user.service";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { DeleteTestUser } from "./DeleteTestBotUser";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: "16px",
};

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

function TestBotModal({ openModal, handleClose, chatbotId, businessAccount }: any) {
  const [addNumber, SetAddNumber] = useState<boolean>(true);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [chatbotToaster, setChatbotToaster] = React.useState<ToasterInterface | null>(null);
  const [testUsers, setTestUsers] = React.useState<any>();
  const [refreshList, setRefreshList] = React.useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(false);
  const [showTimer, setShowTimer] = React.useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = React.useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [userID, setUserID] = React.useState<string>("");

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", phoneCode: 1, phoneNumber: "" } });

  //   const [name, setName] = useState("");
  //   const [message, setMessage] = useState("");

  function handleCloseModal() {
    setIsButtonDisabled(false);
    SetAddNumber(true);
    handleClose();
    reset();
  }
  const handleCloseToaster = () => setChatbotToaster(null);

  const handleRefresh = () => {
    setIsButtonDisabled(false);
    setRefreshList(!refreshList);
  };

  const phoneCodeValue = watch("phoneCode", 1);
  const onSubmit = async (data: any) => {
    // console.log("data", data);
    setApiLoading(true);
    setIsButtonDisabled(true);
    try {
      const result: any = await UserServices.createTestUser({
        name: data.name,
        phoneNumber: data.phoneCode + data.phoneNumber,
      });
      if (result) {
        SetAddNumber(true);
        handleRefresh();
        setChatbotToaster({
          open: true,
          severity: "success",
          message: result.message,
        });
        setIsButtonDisabled(false);
        reset();
      } else {
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
        reset();
        setIsButtonDisabled(false);
      }
    } catch (error) {
      setChatbotToaster({
        open: true,
        severity: "success",
        message: "Some error occured",
      });
      reset();
      setIsButtonDisabled(false);
    }
    setApiLoading(false);
  };

  // For sending phone number of user to verify in backend
  const verifyUser = async (phoneNumber: number, id: string) => {
    setSelectedRowId(id);
    setIsButtonDisabled(true);
    setShowTimer(true);
    setTimeout(() => {
      setShowTimer(false);
      handleRefresh();
    }, 20000);
    try {
      const result = await UserServices.verifyUser(phoneNumber);
      if (result.success) {
        setApiLoading(false);
        setChatbotToaster({
          open: true,
          severity: "success",
          message: "Verification message sent",
        });
        setIsButtonDisabled(false);
      } else {
        setApiLoading(false);
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
        setIsButtonDisabled(false);
      }
    } catch (error) {
      setApiLoading(false);
      setChatbotToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
      setIsButtonDisabled(false);
    }
  };

  // Api trigger for sending test bot request for selected user
  const testChatBot = async (receiverId: string, phoneNumber: string, userName: string) => {
    setApiLoading(true);
    setIsButtonDisabled(true);
    try {
      const result = await ChatbotServices.testChatot(
        chatbotId,
        businessAccount._id,
        receiverId,
        phoneNumber,
        userName,
      );
      // console.log(result);
      if (result.success) {
        setChatbotToaster({
          open: true,
          severity: "success",
          message: result.message,
        });
        setIsButtonDisabled(false);
      } else if (result.message === "Success") {
        setChatbotToaster({
          open: true,
          severity: "success",
          message: "Success",
        });
        setIsButtonDisabled(false);
      } else {
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
        setIsButtonDisabled(false);
      }
    } catch (error) {
      setChatbotToaster({
        open: true,
        severity: "success",
        message: "Some error occured",
      });
      setIsButtonDisabled(false);
    }
    handleRefresh();
    setApiLoading(false);
  };

  // Api trigger for removing user from test bot user list
  const deleteTestUser = async (id: string) => {
    setUserID(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  const getTestUserData = async () => {
    setApiLoading(true);
    try {
      const result: any = await UserServices.getTestUsers();
      if (result.success) {
        const contactList = result.data;
        const removeHans = contactList.filter(function (data: any) {
          return data.role !== "Admin";
        });
        setTestUsers(removeHans);
      } else {
        setTestUsers(null);
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setChatbotToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
    }
    setApiLoading(false);
  };

  const twentyFourHours = 23 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();

  const isWithin24Hours = (createdAt: any) => {
    const rowCreatedAt = new Date(createdAt).getTime();
    return currentTime - rowCreatedAt < twentyFourHours;
  };

  useEffect(() => {
    getTestUserData();
  }, [refreshList]);

  useEffect(() => {
    if (openModal) {
      getTestUserData();
    }
  }, [openModal]);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {apiLoading && <LoaderGlobal />}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #DADADA",
              pb: "22px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {addNumber ? null : (
                <Button
                  sx={{ minWidth: "auto", padding: "0" }}
                  onClick={() => {
                    SetAddNumber(true);
                    reset();
                  }}
                >
                  <Image width={24} height={24} src={arrowLeft} alt="arrowLeft" />
                </Button>
              )}

              <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{ fontSize: "24px", fontWeight: "700", lineHeight: "22px", color: "#1F1F1F" }}
              >
                Test this bot on your phone
              </Typography>
            </Box>
            <Button onClick={handleCloseModal} sx={{ "&:hover": { bgcolor: "transparent" } }}>
              <Image width={24} height={24} src={close} alt="close" />
            </Button>
          </Box>
          {addNumber ? (
            <>
              {testUsers && (
                <TableContainer sx={{ height: "400px", overflowY: "auto" }}>
                  <Table aria-labelledby="tableTitle">
                    <TableBody>
                      {testUsers.map((row: any, index: number) => (
                        <TableRow key={index} hover tabIndex={-1}>
                          <TableCell>
                            <Image width={24} height={24} src={comment} alt="comment" />
                          </TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                lineHeight: "22px",
                                color: "#1F1F1F",
                              }}
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "400",
                                lineHeight: "22px",
                                color: "#707070",
                              }}
                            >
                              +{row.phoneNumber}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {showTimer && row._id === selectedRowId ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <Backdrop
                                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                  open={showTimer}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      alignContent: "center",
                                      gap: "12px",
                                    }}
                                  >
                                    <CircularProgress color="inherit" />
                                    <Typography
                                      sx={{
                                        color: "white",
                                        fontWeight: 500,
                                        backgroundColor: "transparent",
                                        fontSize: "18px",
                                        fontFamily: "Roboto",
                                      }}
                                    >
                                      A message has been sent to your Whatsapp number, reply on it
                                      to Test the ChatBot
                                    </Typography>
                                  </Box>
                                </Backdrop>
                              </Box>
                            ) : (
                              <>
                                {row.isVerified && isWithin24Hours(row.createdAt) ? (
                                  <>
                                    <Button
                                      disabled={isButtonDisabled}
                                      sx={{
                                        border: "1px solid #008DF1",
                                        px: "20px",
                                        py: "10px",
                                        borderRadius: "4px",
                                      }}
                                      onClick={() => {
                                        testChatBot(row._id, row.phoneNumber, row.name);
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: "500",
                                          lineHeight: "22px",
                                          color: "#008DF1",
                                        }}
                                      >
                                        Test Bot
                                      </Typography>
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      disabled={isButtonDisabled}
                                      sx={{
                                        border: "1px solid grey",
                                        px: "20px",
                                        py: "10px",
                                        borderRadius: "4px",
                                      }}
                                      onClick={() => {
                                        verifyUser(row.phoneNumber, row._id);
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: "500",
                                          lineHeight: "22px",
                                          color: "grey",
                                        }}
                                      >
                                        Verify User
                                      </Typography>
                                    </Button>
                                  </>
                                )}
                              </>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => deleteTestUser(row._id)}
                              disabled={isButtonDisabled}
                            >
                              <Image width={24} height={24} src={threeDots} alt="threeDots" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", px: "12px", my: "12px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <WarningAmberIcon fontSize="large" sx={{ color: "#FFBF00" }} />
                  <Typography>
                    If you have replied on WhatsApp but your number remains unverified,
                    <span style={{ color: "#008DF1", cursor: "pointer" }} onClick={handleRefresh}>
                      <strong>
                        <em>Click Here!</em>
                      </strong>
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  disabled={isButtonDisabled}
                  onClick={() => SetAddNumber(false)}
                  sx={{
                    bgcolor: "#008DF1",
                    borderRadius: "4px",
                    "&:hover": { bgcolor: "#008DF1" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                      color: "#ffffff",
                    }}
                  >
                    Add Number
                  </Typography>
                </Button>
              </Box>
            </>
          ) : (
            <>
              {apiLoading && <LoaderGlobal />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "12px",
                    flexDirection: "column",
                    mt: "16px",
                    px: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "22px",
                      color: "#1F1F1F",
                    }}
                  >
                    Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box sx={{ width: "100%" }}>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          autoComplete="off"
                          label={""}
                          inputProps={{ style: { height: "40px" } }}
                          placeholder="Enter Name"
                          variant="outlined"
                          sx={{ borderColor: "#79767D", height: "40px" }}
                        />
                      )}
                      rules={{
                        required: "required",
                      }}
                    />
                    {errors?.name?.message ? (
                      <Box
                        className="required"
                        color="error.main"
                        mt={1}
                        sx={{ textAlign: "right", fontSize: "14px", fontFamily: "Roboto" }}
                      >
                        <>Field is required</>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "12px",
                    flexDirection: "column",
                    mt: "16px",
                    px: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "22px",
                      color: "#1F1F1F",
                    }}
                  >
                    Phone Number <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "#C9E9FF",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "4px",
                          py: "10px",
                          px: "12px",
                          borderRadius: "30px",
                        }}
                      >
                        {phoneCodeValue === 1 ? (
                          <Image width={24} height={24} src={flagAmerica} alt="flagAmerica" />
                        ) : (
                          <>
                            {phoneCodeValue === 65 ? (
                              <Image
                                width={24}
                                height={24}
                                src={flagSingapore}
                                alt="flagSingapore"
                              />
                            ) : (
                              <>
                                {phoneCodeValue === 91 && (
                                  <Image width={24} height={24} src={flagIndia} alt="flagIndia" />
                                )}
                              </>
                            )}
                          </>
                        )}
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "22px",
                            color: "#008DF1",
                          }}
                        >
                          {phoneCodeValue}
                        </Typography>

                        <Controller
                          control={control}
                          name="phoneCode"
                          render={({ field }) => (
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              {...field}
                              sx={{ textAlign: "center" }}
                            >
                              <MenuItem value={1}>USA</MenuItem>
                              <MenuItem value={91}>INDIA</MenuItem>
                              <MenuItem value={65}>SINGAPORE</MenuItem>
                            </Select>
                          )}
                          rules={{
                            required: "required",
                          }}
                        />
                      </Box>
                      <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <TextField
                            autoComplete="off"
                            {...field}
                            inputProps={{
                              type: "text",
                              style: { height: "43px" },
                              onInput: (e: any) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                              },
                            }}
                            id="outlined-basic"
                            placeholder="Enter Phone Number"
                            variant="outlined"
                            sx={{ borderColor: "#79767D", height: "50px" }}
                          />
                        )}
                        rules={{
                          required: "Required",
                          validate: (value) =>
                            /^[0-9]*$/.test(value) || "Please enter only numeric characters (0-9)",
                        }}
                      />
                    </Box>
                    {errors.phoneCode || errors.phoneNumber ? (
                      <Box
                        className="required"
                        color="error.main"
                        sx={{
                          width: "100%",
                          textAlign: "right",
                          fontSize: "14px",
                          fontFamily: "Roboto",
                        }}
                      >
                        <>Field is required</>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    px: "8px",
                    mt: "50px",
                  }}
                >
                  <Button
                    disabled={isButtonDisabled}
                    sx={{
                      bgcolor: "#008DF1",
                      borderRadius: "4px",
                      "&:hover": { bgcolor: "#008DF1" },
                    }}
                    type="submit"
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "22px",
                        color: "#ffffff",
                      }}
                    >
                      Add Number
                    </Typography>
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Box>
      </Modal>
      {chatbotToaster && (
        <Toaster
          open={chatbotToaster.open}
          severity={chatbotToaster.severity}
          onClose={handleCloseToaster}
          message={chatbotToaster.message}
        />
      )}
      {openDeleteModal && (
        <DeleteTestUser
          open={openDeleteModal}
          onClose={handleDeleteModalClose}
          selectedUser={userID}
          refreshPage={handleRefresh}
        />
      )}
    </>
  );
}
export default TestBotModal;
