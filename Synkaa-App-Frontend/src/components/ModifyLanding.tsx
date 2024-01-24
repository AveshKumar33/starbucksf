import { Box, Button, Divider, Link, TextField } from "@mui/material";
import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MobileFrame from "@/assets/images/mobile_frame.svg";
import LandingPage from "./LandingPage";
import Toaster from "@/components/Toaster";
import LandingServices from "@/services/landing.services";
import { useRouter } from "next/navigation";
import Resizer from "react-image-file-resizer";
import LoaderGlobal from "./LoaderGlobal";

interface StateLandingPageType {
  resturantName: string;
  header: string;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

interface ModifyLandingProps {
  resturantName: string;
  header: string;
  lastUpdated: string;
}

const ModifyLanding: React.FC<ModifyLandingProps> = ({ resturantName, header, lastUpdated }) => {
  const route = useRouter();
  const [pageDetail, setPageDetail] = React.useState<StateLandingPageType>({
    resturantName: resturantName,
    header: header,
  });
  const [logoName, setLogoName] = React.useState<string | null>(null);
  const [logoBase64, setLogoBase64] = React.useState<any>(null);
  const [bgImageName, setBgImageName] = React.useState<string | null>(null);
  const [bgImageBase64, setBgImageBase64] = React.useState<any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [updateToaster, setUpdateToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);

  // Opening Editor for terms and condition
  const handleOpenEditor = () => {
    route.push("/dashboard/settings/edit-terms-condition");
  };

  // Setting field values in state
  const handleValueChange = (event: any, field: string) => {
    setIsButtonDisabled(false);
    setPageDetail((prevValue) => ({
      ...prevValue,
      [field]: event.target.value,
    }));
  };

  // resizing logo in 100 by 100 format and compressing it
  const resizeLogo = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "PNG",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  // Getting logo from input field and compressing it using above function and then setting the base64 url in another state
  const handleLogoUpload = async (e: any) => {
    setIsButtonDisabled(false);
    const file = e.target.files[0];
    if (file) {
      setLogoName(file.name);
      const logoImage = await resizeLogo(file);
      // console.log("Logo Image", logoImage);
      setLogoBase64(logoImage);
    }
  };

  // resizing background image in 1080 by 1920 pixels and compressing it
  const resizeBackground = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        1920,
        "JPEG",
        75,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  // Getting background image from input field and compressing it using above function and then setting the base64 url in another state
  const handleBgUpload = async (e: any) => {
    setIsButtonDisabled(false);
    const file = e.target.files[0];
    if (file) {
      setBgImageName(file.name);
      const backgroundImage = (await resizeBackground(file)) as string;
      // console.log("Background Image", backgroundImage);
      // console.log(backgroundImage.length);
      setBgImageBase64(backgroundImage);
    }
  };

  // Submit Request to API with data and showing toaster on succes or failure
  const handleSubmit = async () => {
    setApiLoading(true);
    try {
      if (pageDetail && pageDetail.resturantName && pageDetail.header) {
        if (pageDetail.resturantName.length < 30 && pageDetail.header.length < 50) {
          setIsButtonDisabled(true);
          const resturantName = pageDetail.resturantName;
          const header = pageDetail.header;
          const result = await LandingServices.postLanding(
            logoBase64,
            resturantName,
            header,
            bgImageBase64,
            null,
          );
          if (result) {
            if (result.success) {
              setUpdateToaster({
                open: true,
                severity: "success",
                message: "Landing page modified successfully",
              });
              setTimeout(() => {
                handleCloseToaster();
                setIsButtonDisabled(false);
              }, 500);
            } else {
              setUpdateToaster({
                open: true,
                severity: "error",
                message: result.message,
              });
              setTimeout(() => {
                handleCloseToaster();
                setIsButtonDisabled(false);
              }, 500);
            }
          } else {
            setUpdateToaster({
              open: true,
              severity: "error",
              message: "Some error code",
            });
            setTimeout(() => {
              setIsButtonDisabled(false);
              handleCloseToaster();
            }, 500);
          }
        } else {
          setUpdateToaster({
            open: true,
            severity: "warning",
            message: "Length of characters exceeded",
          });
        }
      } else {
        setUpdateToaster({
          open: true,
          severity: "warning",
          message: "Required fields are empty",
        });
      }
    } catch (error) {
      setUpdateToaster({
        open: true,
        severity: "error",
        message: "Some error code",
      });
      setTimeout(() => {
        setIsButtonDisabled(false);
        handleCloseToaster();
      }, 500);
    }
    setApiLoading(false);
  };

  // Closing Toaster
  const handleCloseToaster = () => {
    setUpdateToaster(null);
  };

  return (
    <>
      {apiLoading && <LoaderGlobal />}
      <Box
        sx={{
          width: "100%",
          background: "white",
          borderRadius: "12px",
          height: "calc(100vh - 110px)",
          padding: "28px",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "24px",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
              Landing Page
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "400", color: "#1C1B1F", fontSize: "14px" }}
            >
              Edit and personalize your landing page
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleSubmit} disabled={isButtonDisabled}>
              Update
            </Button>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: "24px" }} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: "1", width: "calc(40% - 65px)" }}>
            <label>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Restaurant Name <span style={{ color: "red" }}>*</span>
              </Typography>
            </label>
            <TextField
              value={pageDetail.resturantName}
              autoComplete="off"
              sx={{
                width: "100%",
                borderRadius: "4px",
                marginTop: "16px",
              }}
              type="text"
              onChange={(e) => {
                handleValueChange(e, "resturantName");
              }}
            />
            <Typography
              sx={{ color: "grey", fontWeight: 400, fontSize: "18px", marginBottom: "32px" }}
            >
              Max characters: 30
            </Typography>
            <label>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Header <span style={{ color: "red" }}>*</span>
              </Typography>
            </label>
            <TextField
              value={pageDetail.header}
              autoComplete="off"
              sx={{
                width: "100%",
                borderRadius: "4px",
                marginTop: "16px",
              }}
              type="text"
              onChange={(e) => {
                handleValueChange(e, "header");
              }}
            />
            <Typography
              sx={{ color: "grey", fontWeight: 400, fontSize: "18px", marginBottom: "32px" }}
            >
              Max characters: 50
            </Typography>
            <label>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Company Logo
              </Typography>
            </label>
            <label htmlFor="file-input" style={{ position: "relative", marginTop: "16px" }}>
              <input
                type="file"
                id="logo-file-input"
                accept=".png"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onChange={(e) => handleLogoUpload(e)}
              />
              <Box
                sx={{
                  border: "1px dashed #008DF1",
                  padding: "40px",
                  background: "#F5FBFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  marginTop: "16px",
                  height: "600",
                }}
              >
                <FileDownloadIcon sx={{ color: "#008DF1", marginRight: "14px" }} />
                <Typography
                  sx={{
                    color: "#008DF1",
                    fontSize: "14px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Select a media file to upload
                  <br />
                  or drag & drop here
                </Typography>
              </Box>
            </label>
            <Box sx={{ p: "16px 0 24px 0" }}>
              {/* {logoError && <Typography sx={{ color: "red" }}>{logoError}</Typography>} */}
              {logoName && (
                <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "600" }}>
                  {logoName}
                </Typography>
              )}
            </Box>
            <label>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Background Image
              </Typography>
            </label>
            <label htmlFor="file-input" style={{ position: "relative", marginTop: "16px" }}>
              <input
                style={{
                  opacity: "0",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                }}
                type="file"
                id="bg-file-input"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleBgUpload(e)}
              />
              <Box
                sx={{
                  border: "1px dashed #008DF1",
                  padding: "40px",
                  background: "#F5FBFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  marginTop: "16px",
                }}
              >
                <FileDownloadIcon sx={{ color: "#008DF1", marginRight: "14px" }} />
                <Typography
                  sx={{
                    color: "#008DF1",
                    fontSize: "14px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Select a media file to upload
                  <br />
                  or drag & drop here
                </Typography>
              </Box>
            </label>
            <Box sx={{ p: "16px 0 24px 0" }}>
              {/* {bgImageError && <Typography sx={{ color: "red" }}>{bgImageError}</Typography>} */}
              {bgImageName && (
                <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "600" }}>
                  {bgImageName}
                </Typography>
              )}
            </Box>
            <Divider sx={{ marginTop: "8px", marginBottom: "24px" }} />
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Terms & Condition
            </Typography>
            <Typography variant="subtitle2" sx={{ py: "20px" }}>
              I have read the
              <Link
                style={{
                  fontWeight: "600",
                  color: "#000",
                  paddingLeft: "4px",
                  fontStyle: "italic",
                }}
              >
                Terms & Conditions
              </Link>{" "}
              and allow {pageDetail?.resturantName ? pageDetail.resturantName : "Smoke House"} to
              contact me via WhatsApp.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Button onClick={handleOpenEditor}>
                <Typography variant="h6" sx={{ fontWeight: "700", color: "#008DF1" }}>
                  Edit Terms & Conditions
                </Typography>
              </Button>
              <Typography
                variant="caption"
                sx={{ fontWeight: "400", color: "#707070", py: "16px" }}
              >
                Last Updated: {lastUpdated}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: "1", width: "calc(60% - 65px)", padding: "40px" }}>
            <Box
              sx={{
                border: "1px dashed #000",
                padding: "56px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "320px",
                  borderRadius: "53px",
                  height: "670px",
                  position: "relative",
                }}
              >
                <LandingPage
                  resturantName={pageDetail?.resturantName}
                  header={pageDetail?.header}
                  companyLogo={logoBase64 || null}
                  bgImage={bgImageBase64 || null}
                />
                <Image className="mobile_frame" src={MobileFrame} alt="MobileFrame" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {updateToaster && (
        <Toaster
          open={updateToaster.open}
          severity={updateToaster.severity}
          onClose={handleCloseToaster}
          message={updateToaster.message}
        />
      )}
    </>
  );
};

export default ModifyLanding;
