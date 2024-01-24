"use client";
import React from "react";
import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import SideBar from "@/components/SideBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserServices from "@/services/user.service";
import NotAdmin from "@/components/NotAdmin";
import LoaderGlobal from "@/components/LoaderGlobal";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const adminData = localStorage.getItem("Admin");
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [adminFound, setAdminFound] = React.useState<boolean>(true);

  // To fetch Admin and set in localstorage
  async function getAdminUser() {
    setApiLoading(true);
    if (user && user.email) {
      try {
        const result: any = await UserServices.loginAdmin(user.email);
        if (result.success && result.data !== "Email does not exist") {
          localStorage.setItem("Admin", JSON.stringify(result.data._props));
          setAdminFound(true);
          setApiLoading(false);
        }
        if (result.data === "Email does not exist") {
          setAdminFound(false);
          setApiLoading(false);
        }
      } catch (error) {
        console.log(error);
        setApiLoading(false);
      }
    }
  }

  React.useEffect(() => {
    if (!adminData) {
      getAdminUser();
    }
  }, []);

  return (
    <>
      {apiLoading && <LoaderGlobal />}
      {!adminFound && <NotAdmin />}
      {pathname === "/dashboard/settings/edit-terms-condition" ? (
        <>{children}</>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexGrow: "1",
            bgcolor: "#F0F6FE",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              flexBasis: "60px",
            }}
          >
            <SideBar />
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Header />
            <Box
              sx={{
                p: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                marginTop: "68px",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default withPageAuthRequired(DashboardLayout);
