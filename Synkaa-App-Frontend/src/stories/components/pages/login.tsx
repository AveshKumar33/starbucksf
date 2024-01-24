/* eslint-disable no-undef */
import theme from "../../../theme/theme";
import { Box, ThemeProvider, Grid, Typography, Link } from "@mui/material";
import React from "react";
import Image from "next/image";
import loginBg from "../../../../src/assets/images/loginbg.svg";
import logo from "../../../../src/assets/images/logo.svg";

export const Page: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6} sx={{ height: "100%" }}>
            <Box sx={{ position: "relative", height: "100%" }}>
              <Box className="fullbg">
                <Image className="img-bg" src={loginBg} fill={true} alt="Chat Bot" />
              </Box>
              <Box sx={{ position: "absolute", top: "0", padding: "3rem" }}>
                <Typography sx={{ color: "#01CBD5" }} variant="h1">
                  Communication
                </Typography>
                <Typography sx={{ color: "#FFFFFF" }} variant="h1">
                  Made Simple!
                </Typography>
                <Typography sx={{ color: "#FFFFFFB2" }} variant="subtitle1">
                  Communication Made Simple!
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ backgroundColor: theme.palette.primary.light }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  maxWidth: "26rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Image src={logo} alt="logo" />
                {/* <img src="assets/logo.svg" alt="logo" /> */}
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    padding: "16px 64px",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: 500,
                    marginTop: "24px",
                    fontFamily: "Roboto",
                  }}
                >
                  Login
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
