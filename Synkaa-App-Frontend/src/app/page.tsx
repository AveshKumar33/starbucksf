"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <>
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  // If user present redirect to dashboardss

  if (user) {
    return (
      <>
        <div>
          <Dashboard />
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Login />
      </>
    );
  }

  return <main></main>;
}

/***********************comments************************/
