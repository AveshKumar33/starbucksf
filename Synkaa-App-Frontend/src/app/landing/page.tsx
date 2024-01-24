"use client";
import { Box, Button, CircularProgress, FormLabel, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import landingBg from "@/assets/images/landing-bg.png";
// import landbg from "../../assets/images/landing-bg.png"
import theme from "@/theme/theme";
import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { setTimeout } from "timers";
import LandingServices from "@/services/landing.services";
import CustomText from "@/components/CustomTextSize";

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

function Landing() {
  const router = useRouter();
  const [authenticateButton, setAuthenticateButton] = React.useState(false);
  const [newLanding, setNewLanding] = React.useState<LandingPageType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const {
    // handleSubmit,
    control,
    // formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const searchParams = useSearchParams();

  const handleCheckboxChange = (e: any) => {
    setAuthenticateButton(e.target.checked);
  };

  const handleAuthenticate = async () => {
    const chatbotName = searchParams.get("chatbotName");
    const admin = searchParams.get("admin");
    window.localStorage.setItem("authenticated", "true");
    let uri = `https://api.whatsapp.com/send/?phone=${admin}&text=Hi welcome *${chatbotName}*, please continue!&app_absent=0`;
    let encoded = encodeURI(uri);
    // console.log("redirect to", encoded);
    window.location.href = encoded;
  };

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

  useEffect(() => {
    const fetchChatbotData = async () => {
      const chatbotName = searchParams.get("chatbotName");
      const value = window.localStorage.getItem("authenticated");
      if (value && value === "true") {
        const admin = searchParams.get("admin");
        let uri = `https://api.whatsapp.com/send/?phone=${admin}&text=Hi welcome *${chatbotName}*, please continue!&app_absent=0`;
        let encoded = encodeURI(uri);
        // console.log("redirect to", encoded);
        window.location.href = encoded;
      } else {
        getAll();

        const chatbotId = searchParams.get("chatbotId");
        if (!chatbotId) {
          setTimeout(async () => {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landingpage/visits`);
            const response = await result.json();
            // console.log("print data", response);
            if (response.data == 0) {
              router.replace("/error-page");
            }
          }, 60000);
        }
      }
    };
    fetchChatbotData();
  }, []);

  // useEffect(() => {
  //   const qrName = searchParams.get("qrName");

  //   const result = await
  // }, [pathname, searchParams]);

  // return (
  //   <>
  //     <Box sx={{ maxWidth: "600px", mx: "auto" }}>
  //       {loading ? (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100vh",
  //           }}
  //         >
  //           <CircularProgress />
  //         </Box>
  //       ) : (
  //         <>
  //           <Box
  //             sx={{
  //               position: "relative",
  //               boxSizing: "border-box",
  //               height: "100%",
  //             }}
  //           >
  //             <Box
  //               sx={{
  //                 position: "absolute",
  //                 height: "100%",
  //                 top: "0",
  //                 bottom: "0",
  //                 left: "0",
  //                 right: "0",
  //                 zIndex: "-1",
  //               }}
  //             >
  //               {newLanding ? (
  //                 <>
  //                   {newLanding.backgroundImage && (
  //                     <>
  //                       <Image
  //                         width={10}
  //                         height={100}
  //                         src={newLanding.backgroundImage}
  //                         alt="background"
  //                         style={{ height: "100%", width: "100%", objectFit: "fill" }}
  //                       />
  //                     </>
  //                   )}
  //                 </>
  //               ) : (
  //                 <>
  //                   <Image
  //                     width={10}
  //                     height={100}
  //                     src={landingBg}
  //                     alt="background"
  //                     style={{ height: "100%", width: "100%", objectFit: "fill" }}
  //                   />
  //                 </>
  //               )}
  //             </Box>
  //             <form>
  //               <Box sx={{ px: "20px", py: "16px" }}>
  //                 {newLanding ? (
  //                   <>
  //                     {newLanding.backgroundImage && (
  //                       <>
  //                         <Image height="33" width={100} src={newLanding.companyLogo} alt="logo" />
  //                       </>
  //                     )}
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Image height="33" width={100} src={logo} alt="logo" />
  //                   </>
  //                 )}
  //               </Box>
  // <Box
  //   sx={{
  //     px: "29px",
  //     paddingBottom: "40px",
  //     display: "flex",
  //     justifyContent: "end",
  //     flexDirection: "column",
  //     height: "auto",
  //     boxSizing: "border-box",
  //   }}
  // >
  //   <Typography variant="h3" sx={{ color: "#FFF", fontWeight: "700" }}>
  //     {newLanding ? newLanding.resturantName : "Synkaa Pte Ltd"}
  //   </Typography>
  //   <Typography variant="h6" sx={{ color: "#FFF", fontWeight: "400", py: "10px" }}>
  //     {" +6588797848 , info@synkaa.com "}
  //   </Typography>
  //   <Typography variant="h6" sx={{ color: "#FFF", fontWeight: "400", py: "10px" }}>
  //     {" 60 PAYA LEBAR ROAD #10-31 Singapore , 409051 "}
  //   </Typography>
  //   <Typography
  //     variant="h6"
  //     sx={{
  //       fontWeight: "500",
  //       color: "#0EF4FF",
  //       paddingBottom: "48px",
  //       lineHeight: "1.5rem",
  //     }}
  //   >
  //     In order to continue, kindly follow instructions below
  //   </Typography>
  //   <FormGroup>
  //     <Box sx={{ display: "flex", flexDirection: "" }}>
  //       <Controller
  //         control={control}
  //         name="terms"
  //         render={({ field }) => (
  //           // Material UI TextField already supports
  //           // `value` and `onChange`
  //           <Checkbox
  //             {...field}
  //             sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "#fff" } }}
  //             onChange={handleCheckboxChange}
  //           />
  //         )}
  //         rules={{
  //           required: "required",
  //         }}
  //       />
  //       <FormLabel sx={{ color: "white" }}>
  //         I have read the{" "}
  //         <Link
  //           href={`${process.env.NEXT_PUBLIC_BASE_URL}/term-condition`}
  //           legacyBehavior
  //         >
  //           <a style={{ color: "white" }}>Terms & Conditions</a>
  //         </Link>{" "}
  //         & allow {newLanding ? newLanding.resturantName : "Synkaa Pte Ltd"} to
  //         contact me via WhatsApp.
  //       </FormLabel>
  //     </Box>
  //   </FormGroup>
  //   <Button
  //     id="basic-button"
  //     aria-haspopup="true"
  //     variant="contained"
  //     onClick={handleAuthenticate}
  //     sx={{
  //       "&.Mui-disabled": {
  //         background: "#eaeaea",
  //         color: "#c0c0c0",
  //       },
  //       marginTop: "24px",
  //     }}
  //     disableElevation
  //     size="large"
  //     disabled={!authenticateButton}
  //   >
  //     Authenticate
  //   </Button>
  // </Box>
  //             </form>
  //           </Box>
  //         </>
  //       )}
  //     </Box>
  //   </>
  // );

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            maxWidth: "600px",
          }}
        >
          <Box
            sx={{
              px: "20px",
              py: "16px",
              backgroundColor: theme.palette.primary.light,
              width: "100%",
            }}
          >
            {newLanding ? (
              <>
                {newLanding.companyLogo && (
                  <Image height="33" width={100} src={newLanding.companyLogo} alt="logo" />
                )}
              </>
            ) : (
              <Image height="33" width={100} src={logo} alt="logo" />
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              backgroundImage:
                newLanding && newLanding.backgroundImage
                  ? `url(${newLanding.backgroundImage})`
                  : `url(${landingBg})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box
              sx={{
                paddingTop: "40px",
                paddingBottom: "40px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "auto",
                boxSizing: "border-box",
                position: "fixed",
                bottom: 0,
                left: 0,
                maxWidth: "600px",
                gap: "12px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", px: "10px" }}>
                <CustomText
                  text={newLanding ? newLanding.resturantName : "Synkaa PTE LTD"}
                  firstFont="40px"
                  secondFont="33px"
                  thirdFont="25px"
                  fontWeight={700}
                />
                {newLanding && newLanding.header ? (
                  <CustomText
                    text={newLanding.header}
                    firstFont="20px"
                    secondFont="18px"
                    thirdFont="18px"
                    fontWeight={400}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      fontWeight: "400",
                      py: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    +6588797848, info@synkaa.com,
                    <br />
                    60 PAYA LEBAR ROAD #10-31 Singapore , 409051
                  </Typography>
                )}
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
              <FormGroup>
                <Box sx={{ display: "flex", paddingRight: "10px" }}>
                  <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                      // Material UI TextField already supports
                      // `value` and `onChange`
                      <Checkbox
                        {...field}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "#fff" } }}
                        onChange={handleCheckboxChange}
                      />
                    )}
                    rules={{
                      required: "required",
                    }}
                  />
                  <FormLabel sx={{ color: "white", fontSize: "14px" }}>
                    I have read the{" "}
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/term-condition`}
                      legacyBehavior
                    >
                      <a style={{ color: "white" }}>Terms & Conditions</a>
                    </Link>{" "}
                    & allow {newLanding ? newLanding.resturantName : "Synkaa Pte Ltd"} to contact me
                    via WhatsApp.
                  </FormLabel>
                </Box>
              </FormGroup>
              <Button
                id="basic-button"
                aria-haspopup="true"
                variant="contained"
                onClick={handleAuthenticate}
                sx={{
                  "&.Mui-disabled": {
                    background: "#eaeaea",
                    color: "#c0c0c0",
                  },
                  marginTop: "24px",
                  mx: "10px",
                }}
                disableElevation
                size="large"
                disabled={!authenticateButton}
              >
                Authenticate
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Landing;
