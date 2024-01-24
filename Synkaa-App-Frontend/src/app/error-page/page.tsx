"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.svg";
import gif from "@/assets/images/sessionexpriedgif.gif";
import theme from "@/theme/theme";
import cancel from "@/assets/images/cancel.svg";

const Sessionexpired: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "600px",
        mx: "auto",
        backgroundColor: theme.palette.primary.light,
        padding: "24px",
      }}
    >
      <Box>
        <Image height="50" src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "calc(100vh - 90px)",
        }}
      >
        <Image height="100" src={gif} alt="logo" />
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", py: "16px" }}>
          <Image height="45" src={cancel} alt="logo" />
          <Typography variant="h3" sx={{ fontSize: "25px", fontWeight: "600", color: "#1F1F1F" }}>
            Session Expired
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ pb: "38px", color: "#707070", fontSize: "14px", fontWeight: "400" }}
        >
          Session is no longer valid. Please scan the QR again to proceed.
        </Typography>
      </Box>
    </Box>
  );
};

export default Sessionexpired;
