import { Box } from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import DynamicHeader from "@/components/DynamicHeader";

export const Header = () => {
  const pathname = usePathname();

  // style---menu--item
  return (
    <header>
      <Box
        sx={{
          minHeight: "4.25rem",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.15)",
          alignItems: "center",
          padding: "0 32px",
          position: "fixed",
          width: "100%",
          left: "57px",
          zIndex: "2",
        }}
      >
        {pathname === "/dashboard" ? (
          <>
            <DashboardHeader />
          </>
        ) : (
          <>
            <DynamicHeader pathname={pathname} />
          </>
        )}
      </Box>
    </header>
  );
};
