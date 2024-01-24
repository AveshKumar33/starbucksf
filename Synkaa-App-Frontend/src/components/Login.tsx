import React from "react";
import Image from "next/image";
import { Box, Grid, Typography, Link } from "@mui/material";
import theme from "@/theme/theme";
import loginBg from "../assets/images/loginbg.svg";
import logo from "../assets/images/logo.svg";
import "../assets/styles/main.scss";

const Login = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box className="fullbg">
              <Image className="img-bg" src={loginBg} fill={true} alt="Chat Bot" loading="lazy" />
            </Box>
            {/* <Box sx={{ position: "absolute", top: "0", padding: "3rem" }}>
              <Typography sx={{ color: "#01CBD5" }} variant="h1">
                Communication
              </Typography>
              <Typography sx={{ color: "#FFFFFF" }} variant="h1">
                Made Simple!
              </Typography>
              <Typography sx={{ color: "#FFFFFFB2" }} variant="subtitle1">
                Communication Made Simple!
              </Typography>
            </Box> */}
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
              <Image src={logo} alt="logo" loading="lazy" />
              <Link
                href="/api/auth/login"
                style={{
                  padding: "16px 64px",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "8px",
                  color: "white",
                  fontWeight: 500,
                  marginTop: "24px",
                  fontFamily: "Roboto",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                mb: "29px",
              }}
            >
              <Typography sx={{ color: "#008DF1", fontSize: "18px", fontWeight: 700 }}>
                SYNKAA PTE. LTD.
              </Typography>
              <Typography sx={{ color: "#5E5E5E", fontSize: "18px", fontWeight: 400 }}>
                +6588797848, info@synkaa.com
              </Typography>
              <Typography sx={{ color: "#5E5E5E", fontSize: "18px", fontWeight: 400 }}>
                60 PAYA LEBAR ROAD #10-31 PAYA LEBAR SQUARE
              </Typography>
              <Typography sx={{ color: "#5E5E5E", fontSize: "18px", fontWeight: 400 }}>
                SINGAPORE (409051)
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mb: "40px",
                px: "40px",
              }}
            >
              <Typography
                sx={{ color: "#848484", fontWeight: "400", fontSize: "24px", lineHeight: "34px" }}
              >
                © Synkaa 2023. All rights reserved.
              </Typography>
              <Link href="/contactUs" sx={{}}>
                <Typography
                  sx={{ color: "#008DF1", fontWeight: "400", fontSize: "24px", lineHeight: "34px" }}
                >
                  Contact Us
                </Typography>
              </Link>
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
