"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 10);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
}

export default Dashboard;
