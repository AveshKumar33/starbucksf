import { Box, Typography, Button, Dialog } from "@mui/material";
import React from "react";
import LoaderGlobal from "./LoaderGlobal";
import { TextFieldWithoutLabel } from "@/theme/materialComponents/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ChangeUserPasswordModal({ openModal, closeModal, userId }: any) {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<string>("");

  const handleCancelClick = () => {
    closeModal();
    setNewPassword("");
    setConfirmPassword("");
    setIsButtonDisabled(false);
  };

  const updateUserPassword = async () => {
    setIsButtonDisabled(true);
    if (newPassword === confirmPassword) {
      // console.log("INSIDE IF", newPassword + confirmPassword);
      setApiLoading(true);
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-access-token`, {
          method: "POST",
        });
        if (result.status === 200 || result.status === 201) {
          const data = await result.json();

          const userResult = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/change-user-password`,
            {
              method: "PATCH",
              body: JSON.stringify({
                password: newPassword,
                accessToken: data.accessToken,
                userId,
              }),
            },
          );
          if (userResult.status === 200 || userResult.status === 201) {
            const logoutLink = document.createElement("a");
            logoutLink.href = `/api/auth/logout`;
            logoutLink.click();
          } else {
            const errorMessage = await userResult.json();
            setPasswordError(errorMessage.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setApiLoading(false);
    } else {
      setPasswordError("Passwords must match to proceed");
    }
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
            width: "580px",
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
              Change Password
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
                  New Password
                </Typography>
                <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <TextFieldWithoutLabel
                      type={showNewPassword ? "text" : "password"}
                      sx={{ width: "100%" }}
                      value={newPassword}
                      onChange={(e) => {
                        setPasswordError("");
                        setNewPassword(e.target.value);
                      }}
                    />

                    {showNewPassword ? (
                      <Box
                        onClick={() => setShowNewPassword(false)}
                        sx={{
                          border: "1px solid #707070",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          marginLeft: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <VisibilityIcon />
                      </Box>
                    ) : (
                      <Box
                        onClick={() => setShowNewPassword(true)}
                        sx={{
                          border: "1px solid #707070",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          marginLeft: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <VisibilityOffIcon />
                      </Box>
                    )}
                  </Box>
                  {passwordError !== "" && passwordError && (
                    <Typography sx={{ color: "red" }}>{passwordError}</Typography>
                  )}
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
                  Confirm Password
                </Typography>
                <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <TextFieldWithoutLabel
                      type={showConfirmPassword ? "text" : "password"}
                      sx={{ width: "100%" }}
                      value={confirmPassword}
                      onChange={(e) => {
                        setPasswordError("");
                        setConfirmPassword(e.target.value);
                      }}
                    />

                    {showConfirmPassword ? (
                      <Box
                        onClick={() => setShowConfirmPassword(false)}
                        sx={{
                          border: "1px solid #707070",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          marginLeft: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <VisibilityIcon />
                      </Box>
                    ) : (
                      <Box
                        onClick={() => setShowConfirmPassword(true)}
                        sx={{
                          border: "1px solid #707070",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          marginLeft: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <VisibilityOffIcon />
                      </Box>
                    )}
                  </Box>
                  {passwordError !== "" && passwordError && (
                    <Typography sx={{ color: "red" }}>{passwordError}</Typography>
                  )}
                </Box>
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
                  onClick={updateUserPassword}
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
                  Update
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
        </Box>
      </Dialog>
    </>
  );
}
export default ChangeUserPasswordModal;
