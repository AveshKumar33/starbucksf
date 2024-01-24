import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const NotAdmin = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem("Admin");
    const logoutLink = document.createElement("a");
    logoutLink.href = `/api/auth/logout`;
    logoutLink.click();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#F2F9FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center vertically
        zIndex: 9999,
        flexDirection: "column",
        textAlign: "center",
        gap: "16px",
      }}
    >
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
        For this user, business account does not exist, please contact admin.
      </Typography>
      <Button
        onClick={clearLocalStorage}
        sx={{
          bgcolor: "#008DF1",
          gap: "10px",
          boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
          borderRadius: "4px",
          cursor: "pointer",
          width: "150px",
          height: "auto",
          padding: "16px",
          justifyContent: "center",
          display: "flex",
        }}
        variant="contained"
      >
        <LogoutIcon
          sx={{
            paddingRight: "2px",
          }}
        />
        Logout
      </Button>
    </Box>
  );
};

export default NotAdmin;
