import { Box, Typography, Button, TextField, Dialog } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import mediaIcon from "@/assets/images/mediaIcon.png";
import React from "react";
import downloadIcon from "@/assets/images/download.png";
import Resizer from "react-image-file-resizer";

function UploadMediaPopup({
  openModal,
  closeModal,
  setImageName,
  imageBase64,
  setImageBase64,
  uploadLocalImage,
  uploadUriImage,
}: any) {
  const urlImageBase64Ref = React.useRef<any>(null);
  const [fromURL, setFromURL] = React.useState<boolean>(false);
  const [imageSizeError, setImageSizeError] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);
  const [urlError, setUrlError] = React.useState<string | null>(null);

  const handleImageUrlChange = (event: any) => {
    setIsButtonDisabled(false);
    setImageUrl(event.target.value);
    setUrlError(null);
  };

  // Fetching image from url
  const fetchAndConvertToBase64 = async () => {
    setUrlError(null);
    setIsButtonDisabled(true);
    try {
      if (imageUrl && imageUrl !== "") {
        const response = await fetch(imageUrl);
        if (response.ok) {
          const blob = await response.blob();
          await new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              let base64String = reader.result;
              if (base64String) {
                urlImageBase64Ref.current = base64String;
              }
              resolve(); // Resolve the promise to continue execution
            };
            reader.readAsDataURL(blob);
          });
          setIsButtonDisabled(false);
        } else {
          setUrlError("This url is invalid select another");
          setIsButtonDisabled(false);
        }
      }
    } catch (error) {
      setUrlError("This url is invalid select another");
      setIsButtonDisabled(false);
    }
  };

  // To resize the image
  const resizeImage = (file: any) =>
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

  // Uploading image from local
  const handleImageUpload = async (e: any) => {
    setUrlError(null);
    setIsButtonDisabled(true);
    const file = e.target.files[0];
    if (file) {
      const date = new Date();
      const timeString = date.getTime();
      const fileName = file.name;
      if (fileName.endsWith(".jpg")) {
        const splitName = fileName.split(".jpg");
        const newImageName = `${splitName[0]}-${timeString}.jpg`;
        setImageName(newImageName);
      }
      if (fileName.endsWith(".jpeg")) {
        const splitName = fileName.split(".jpeg");
        const newImageName = `${splitName[0]}-${timeString}.jpeg`;
        setImageName(newImageName);
      }
      if (fileName.endsWith(".png")) {
        const splitName = fileName.split(".png");
        const newImageName = `${splitName[0]}-${timeString}.png`;
        setImageName(newImageName);
      }
      const backgroundImage = (await resizeImage(file)) as string;
      const imageSizeInBytes = new TextEncoder().encode(backgroundImage).length;
      const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

      if (imageSizeInMB > 5) {
        setImageName(null);
        setImageBase64(null);
        setImageSizeError(true);
      } else {
        setImageSizeError(false);
        setImageBase64(backgroundImage);
      }
    }
    setIsButtonDisabled(false);
  };

  const uploadImageToData = async () => {
    setUrlError(null);
    if (imageUrl) {
      await fetchAndConvertToBase64();
      if (urlImageBase64Ref && urlImageBase64Ref.current) {
        const date = new Date();
        const timeString = date.getTime();
        const newImageName = `Image-${timeString}`;
        uploadUriImage(urlImageBase64Ref.current, newImageName);
      }
      urlImageBase64Ref.current = null;
    } else if (!imageUrl && imageUrl === "") {
      uploadLocalImage();
    }
  };

  // handling cancel click
  const handleCancelClick = () => {
    setUrlError(null);
    setImageBase64(null);
    setImageName(null);
    setImageUrl("");
    setIsButtonDisabled(true);
  };

  function handleClose() {
    setUrlError(null);
    setIsButtonDisabled(false);
    setImageName(null);
    setImageBase64(null);
    setIsButtonDisabled(true);
    closeModal();
  }

  return (
    <>
      <Dialog onClose={handleClose} open={openModal}>
        <Box
          sx={{
            minWidth: "410px",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <Box borderBottom="1px solid #DADADA">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  py: "12px",
                  mb: "12px",
                }}
              >
                <Image width={24} height={24} src={mediaIcon} alt="attach photo" />
                <Typography
                  sx={{
                    color: "var(--dark-grey, #1F1F1F)",
                    fontFamily: "Roboto",
                    fontSize: "17px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "22px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Select Media
                </Typography>
              </Box>
              <Typography onClick={handleClose}>
                <CloseIcon />
              </Typography>
            </Box>
            <Box sx={{ display: "flex", ml: "15px", gap: "20px" }}>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: fromURL ? "#707070" : "#008DF1",
                  borderBottomColor: fromURL ? "transparent" : "#008DF1",
                  borderBottomWidth: "2px",
                  borderBottomStyle: "solid",
                  display: "inline-block",
                }}
                onClick={() => {
                  setImageUrl("");
                  setFromURL(false);
                  setIsButtonDisabled(true);
                }}
              >
                Upload your file
              </Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: fromURL ? "#008DF1" : "#707070",
                  borderBottomColor: fromURL ? "#008DF1" : "transparent",
                  borderBottomWidth: "2px",
                  borderBottomStyle: "solid",
                  display: "inline-block",
                }}
                onClick={() => {
                  setImageBase64(null);
                  setImageName(null);
                  setFromURL(true);
                  setIsButtonDisabled(true);
                }}
              >
                From URL
              </Typography>
            </Box>
          </Box>
          {fromURL ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <TextField
                value={imageUrl}
                autoComplete="off"
                placeholder="Enter URL"
                sx={{
                  width: "488px",
                  borderRadius: "4px",
                  height: "40px",
                  marginTop: "16px",
                }}
                type="text"
                onChange={handleImageUrlChange}
              ></TextField>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Center vertically within the flex container
                  marginTop: "5px",
                  marginBottom: "16px",
                }}
              >
                <Typography sx={{ color: "red" }}>{urlError}</Typography>
              </Box>
            </Box>
          ) : (
            <>
              {imageBase64 ? (
                <Box
                  sx={{
                    mt: "16px",
                    width: "488px",
                    height: "100%",
                    flexShrink: 0,
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={imageBase64}
                    alt="Uploaded Image"
                    style={{ objectFit: "contain", width: "100%", maxHeight: "488px" }}
                  />
                </Box>
              ) : (
                <label
                  htmlFor="fileInput"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "6px",
                    }}
                  >
                    <Box
                      sx={{
                        mt: "16px",
                        width: "488px",
                        height: "116px",
                        flexShrink: 0,
                        borderRadius: "8px",
                        background: "#D7EEFF",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                          height: "100%",
                        }}
                      >
                        <Image width={36} height={36} src={downloadIcon} alt="Download Media" />
                        <Box>
                          <Typography sx={{ color: "#008DF1" }}>
                            Select a media file to upload
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {imageSizeError ? (
                      <Typography sx={{ color: "red" }}>Image size is too big</Typography>
                    ) : (
                      <Typography sx={{ color: "#ACACAC" }}>
                        Recommendation: Upload image size less than 5 MB
                      </Typography>
                    )}
                  </Box>
                </label>
              )}
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "16px", gap: "8px" }}>
            <Button
              onClick={handleCancelClick}
              sx={{
                border: "2px solid #9C9C9C",
                borderRadius: "4px",
                display: "flex",
                width: "170px",
                height: "36px",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                color: "#5B5B5B",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={imageBase64 || imageUrl ? uploadImageToData : undefined}
              sx={{
                border: "2px solid #9C9C9C",
                borderRadius: "4px",
                display: "flex",
                width: "170px",
                height: "36px",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: isButtonDisabled ? "#ACACAC" : "#008DF1",
                "&:hover": {
                  backgroundColor: isButtonDisabled ? "#ACACAC" : "#008DF1",
                  border: "2px solid #9C9C9C",
                  color: "white",
                },
              }}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
export default UploadMediaPopup;
