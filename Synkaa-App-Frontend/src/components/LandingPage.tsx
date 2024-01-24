"use client";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import landingBg from "@/assets/images/landing-bg.png";
import theme from "@/theme/theme";
import Checkbox from "@mui/material/Checkbox";
import LandingServices from "@/services/landing.services";
import CustomText from "./CustomTextSize";

interface LandingPageProps {
  resturantName?: string;
  header?: string;
  companyLogo: string | null;
  bgImage: string | null;
}

interface LandingPageType {
  _id: string;
  uuid: string;
  companyLogo: string;
  resturantName: string;
  header: string;
  backgroundImage: string;
  termCondition: string;
  createdAt: string;
  updatedAt: string;
}

const LandingPage: React.FC<LandingPageProps> = ({
  resturantName,
  header,
  companyLogo,
  bgImage,
}) => {
  const [newLanding, setNewLanding] = React.useState<LandingPageType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getAll = async () => {
    try {
      const result = await LandingServices.getLanding();
      if (result.success) {
        // console.log(result);
        setNewLanding(result.data[0]);
      }
      setLoading(false);
    } catch (error) {
      setNewLanding(null);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAll();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "600px",
        width: "320px",
        borderRadius: "53px",
        height: "670px",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <header>
            <Box
              sx={{
                px: "20px",
                py: "16px",
                backgroundColor: theme.palette.primary.light,
                borderRadius: "53px 53px 0 0",
              }}
            >
              {companyLogo ? (
                <Image
                  width={100}
                  height="33"
                  src={companyLogo}
                  alt="logo"
                  style={{
                    marginLeft: "20px",
                    marginTop: "25px",
                  }}
                />
              ) : (
                <Image
                  width={100}
                  height="33"
                  src={newLanding ? newLanding.companyLogo : logo}
                  alt="logo"
                  style={{
                    marginLeft: "20px",
                    marginTop: "25px",
                  }}
                />
              )}
            </Box>
          </header>
          <Box sx={{ position: "relative", boxSizing: "border-box", height: "calc(100vh - 69px)" }}>
            <Box
              sx={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                zIndex: "0",
                height: "100%",
                width: "100%",
                marginLeft: "12px",
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              {bgImage ? (
                <Image
                  width={10}
                  height={100}
                  src={bgImage}
                  alt="background"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Image
                  width={10}
                  height={100}
                  src={newLanding ? newLanding.backgroundImage : landingBg}
                  alt="background"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                position: "absolute",
                px: "29px",
                paddingBottom: "40px",
                display: "flex",
                justifyContent: "end",
                flexDirection: "column",
                height: "575px",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", px: "10px" }}>
                  <CustomText
                    text={
                      resturantName !== null ? (
                        resturantName
                      ) : (
                        <>{newLanding ? newLanding.resturantName : "Hans Im Gluck"}</>
                      )
                    }
                    firstFont="40px"
                    secondFont="33px"
                    thirdFont="25px"
                    fontWeight={700}
                  />
                  <CustomText
                    text={
                      header !== null ? (
                        header
                      ) : (
                        <>{newLanding ? newLanding.header : "Laugh. Eat. Enjoy."}</>
                      )
                    }
                    firstFont="20px"
                    secondFont="18px"
                    thirdFont="18px"
                    fontWeight={400}
                  />
                </Box>
                <Box sx={{ display: "flex", px: "10px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "500",
                      color: "#0EF4FF",
                      lineHeight: "1.5rem",
                    }}
                  >
                    In order to continue, kindly follow instructions below
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", py: "12px", paddingRight: "10px" }}>
                  <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "#fff" } }} />
                  <Typography sx={{ color: "white", fontSize: "14px" }}>
                    I have read the <em>Terms and Conditions</em> and allow{" "}
                    {resturantName ? resturantName : "Hans Im Gluck"} to contact me via whatsapp
                  </Typography>
                </Box>
                <Button
                  id="basic-button"
                  aria-haspopup="true"
                  variant="contained"
                  sx={{
                    "&.Mui-disabled": {
                      background: "#eaeaea",
                      color: "#c0c0c0",
                    },
                    mx: "10px",
                  }}
                  disableElevation
                  size="large"
                >
                  Authenticate
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LandingPage;
