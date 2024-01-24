import { Box, Typography, Button, Dialog, Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import downloadIcon from "@/assets/images/download.png";
import redClose from "@/assets/images/redCloseIcon.png";
import Resizer from "react-image-file-resizer";
import LoaderGlobal from "./LoaderGlobal";

function UploadProfilePic({ openModal, closeModal, profilePic, userId, refreshPage }: any) {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [imageBase64, setImageBase64] = React.useState<string | null>(profilePic);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleCancelClick = () => {
    closeModal();
    setIsButtonDisabled(false);
  };
  // To resize the image
  const resizeImage = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        1920,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  // Uploading image from local
  const handleImageUpload = async (e: any) => {
    setIsButtonDisabled(true);
    const file = e.target.files[0];
    if (file) {
      const backgroundImage = (await resizeImage(file)) as string;
      setImageBase64(backgroundImage);
    }
    setIsButtonDisabled(false);
  };

  const uploadImageToData = async () => {
    setIsButtonDisabled(true);
    setApiLoading(true);
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-access-token`, {
        method: "POST",
      });
      if (result.status === 200 || result.status === 201) {
        const data = await result.json();

        const userResult = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-profile`, {
          method: "PATCH",

          body: JSON.stringify({
            profile_picture: imageBase64,
            accessToken: data.accessToken,
            userId,
          }),
        });
        if (userResult.status === 200 || userResult.status === 201) {
          refreshPage();
          closeModal();
        } else {
          const errorMessage = await userResult.json();
          setErrorMessage(errorMessage.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setApiLoading(false);
    setIsButtonDisabled(false);
  };

  const removeProfilePic = async () => {
    setImageBase64(null);
  };

  return (
    <>
      <Dialog onClose={handleCancelClick} open={openModal}>
        <Box
          sx={{
            width: "436px",
            height: "546px",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            padding: "32px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {apiLoading && <LoaderGlobal />}
          <Box
            sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}
          >
            <Avatar
              alt="Travis Howard"
              src={imageBase64 ? imageBase64 : ""}
              sx={{ width: "314px", height: "314px" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button disabled={isButtonDisabled}>
              <label
                htmlFor="fileInput"
                style={{
                  display: "flex",
                  height: "47px",
                  padding: "13px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg, .jpeg, .png"
                  style={{
                    display: "none",
                  }}
                  onChange={(e) => handleImageUpload(e)}
                />
                <Image width={24} height={24} src={downloadIcon} alt="Download Media" />
                <Typography sx={{ color: "#008DF1", fontWeight: 500, fontSize: "15px" }}>
                  Upload
                </Typography>
              </label>
            </Button>
            <Button
              disabled={isButtonDisabled}
              onClick={removeProfilePic}
              sx={{
                display: "flex",
                height: "47px",
                padding: "13px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <Image width={24} height={24} src={redClose} alt="Download Media" />
              <Typography sx={{ color: "#EF0000", fontWeight: 500, fontSize: "15px" }}>
                Remove
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button
              disabled={isButtonDisabled}
              onClick={uploadImageToData}
              sx={{
                border: "2px solid #008DF1",
                borderRadius: "4px",
                display: "flex",
                width: "100%",
                height: "40px",
                padding: "13px 16px",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "#008DF1",
                "&:hover": {
                  background: "#008DF1",
                  color: "#FFF",
                  boxShadow:
                    "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Save
            </Button>
            <Button
              disabled={isButtonDisabled}
              onClick={handleCancelClick}
              sx={{
                display: "flex",
                width: "100%",
                height: "40px",
                padding: "13px 16px",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #9C9C9C",
                borderRadius: "4px",
                color: "#5B5B5B",
                marginTop: "16px",
              }}
            >
              Cancel
            </Button>
          </Box>
          {errorMessage !== "" && errorMessage && (
            <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
}
export default UploadProfilePic;
