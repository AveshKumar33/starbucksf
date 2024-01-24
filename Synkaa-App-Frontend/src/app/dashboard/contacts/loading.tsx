import { Box, CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default loading;
