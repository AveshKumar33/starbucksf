import { Box, Typography, Button, Dialog } from "@mui/material";
import Image from "next/image";
import React from "react";
import LoaderGlobal from "./LoaderGlobal";
import LockIcon from "@/assets/images/Vector.png";
import { TextFieldWithoutLabel } from "@/theme/materialComponents/TextField";

function EditUserProfile({ openModal, closeModal, userInfo, userId, refreshPage }: any) {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [name, setName] = React.useState<string>(userInfo.name);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState(userInfo.phone_number);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [nameError, setNameError] = React.useState<string>("");

  // Cancel button click of all modals
  const handleCancelClick = () => {
    closeModal();
    setName(userInfo.name);
    setUserPhoneNumber(userInfo.phone_number);
    setIsButtonDisabled(false);
  };

  // API request to get access token and use management API
  const updateUserInfo = async () => {
    setIsButtonDisabled(true);
    setApiLoading(true);
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-access-token`, {
        method: "POST",
      });
      if (result.status === 200 || result.status === 201) {
        const data = await result.json();

        if (name === "" || undefined || null) {
          setNameError("Name is required");
        } else {
          const userResult = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-user-info`,
            {
              method: "PATCH",
              body: JSON.stringify({
                name: `${name}`,
                phone_number: userPhoneNumber,
                accessToken: data.accessToken,
                userId,
              }),
            },
          );
          if (userResult.status === 200 || userResult.status === 201) {
            refreshPage();
            closeModal();
          } else {
            const errorMessage = await userResult.json();
            setErrorMessage(errorMessage.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setApiLoading(false);
    setIsButtonDisabled(false);
  };

  return (
    <>
      <Dialog onClose={handleCancelClick} open={openModal}>
        <Box
          sx={{
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            padding: "35px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {apiLoading && <LoaderGlobal />}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "32px",
            }}
          >
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "20px",
                letterSpacing: "0.4px",
              }}
            >
              Edit Profile
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <Typography
                  sx={{
                    color: "#1C1B1F",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "20px",
                    letterSpacing: "0.4px",
                  }}
                >
                  Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextFieldWithoutLabel
                  autoComplete="off"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />
                {nameError && nameError !== "" && (
                  <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                    {nameError}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <Typography
                  sx={{
                    color: "#1C1B1F",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "20px",
                    letterSpacing: "0.4px",
                  }}
                >
                  Email Address
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "48px",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    border: "1px solid #707070",
                    background: "#EBEBEB",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#9C9C9C",
                      fontSize: "18px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      lineSpacing: "0.5px",
                      alignItems: "flex-start",
                      width: "464px",
                    }}
                  >
                    {userInfo.email}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <Image width={15} height={20} src={LockIcon} alt="icon" />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <Typography
                  sx={{
                    color: "#1C1B1F",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "20px",
                    letterSpacing: "0.4px",
                  }}
                >
                  Contact Number
                </Typography>
                <TextFieldWithoutLabel
                  autoComplete="off"
                  value={userPhoneNumber}
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <Button
                  disabled={isButtonDisabled}
                  onClick={updateUserInfo}
                  sx={{
                    display: "flex",
                    width: "117px",
                    height: "40px",
                    padding: "13px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    background: "#008DF1",
                    color: "#FFF",
                    "&:hover": {
                      background: "#008DF1",
                      color: "#FFF",
                      boxShadow:
                        "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelClick}
                  sx={{
                    display: "flex",
                    width: "117px",
                    height: "40px",
                    padding: "13px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    color: "#008DF1",
                    border: "1px solid #008DF1",
                    "&:hover": {
                      background: "#FFF",
                      color: "#008DF1",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
          {errorMessage !== "" && errorMessage && (
            <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
}
export default EditUserProfile;
