import React from "react";
import { TextFieldListButton } from "@/theme/materialComponents/TextField";
import { Box, Typography, Button /*, ListItem */, TextField } from "@mui/material";
import Image from "next/image";
import delay from "@/assets/images/delay.svg";
import deleteIconWhite from "@/assets/images/deleteIconWhite.svg";
// import close from "@/assets/images/close.svg";
type ListItemType = {
  id: string;
  title: string;
};

export const ListDrawerContent = ({
  toggleDrawer,
  listItem,
  updateItemNameById,
  deleteNode,
  removeItem,
  handleListItem,
  anchor,
  header,
  setHeader,
  body,
  setBody,
  listHeader,
  setListHeader,
  // handleHeight,
  // setListItemObject,
  saveListNode,
  cancelButton,
  data,
}: any) => {
  const [headerError, setHeaderError] = React.useState<string | null>(null);
  const [bodyError, setBodyError] = React.useState<string | null>(null);
  const [listHeaderError, setListHeaderError] = React.useState<string | null>(null);
  const [listItemError, setListItemError] = React.useState<string | null>(null);

  const handleSaveNode = () => {
    console.log();
    if (header === "" || !header || header === undefined || header.length > 50) {
      setHeaderError("Invalid Header");
    } else if (body === "" || !body || body === undefined) {
      setBodyError("Invalid Body");
    } else if (!listHeader || listHeader === undefined || listHeader.length > 15) {
      setListHeaderError("Invalid List Header/CTA");
    } else if (listItem.length < 1) {
      setListItemError("At least one button required");
    } else {
      setHeaderError(null);
      setBodyError(null);
      setListHeaderError(null);
      saveListNode();
    }
  };

  const handleCancelNode = () => {
    cancelButton();
    {
      data.text && data.text.header !== "" ? setHeader(data.text.header) : setHeader("");
    }
    {
      data.text && data.text.body !== "" ? setBody(data.text.body) : setBody("");
    }
    {
      data.text && data.text.listHeader !== ""
        ? setListHeader(data.text.listHeader)
        : setListHeader("");
    }
    setHeaderError(null);
    setBodyError(null);
    setListHeaderError(null);
  };

  return (
    <>
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "100%",
        }}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, true)}
      >
        <Box sx={{ width: "100%", flex: "1", mt: "25px" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#ffffff",
              px: "16px",
              pt: "8px",
              pb: "24px",
              borderRadius: "8px",
              borderBottom: "1px solid #DADADA",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Image width={24} height={24} src={delay} alt="delay" />
              <Box display="flex" flexDirection="column" gap="4px">
                <Typography
                  sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }}
                >
                  List Button
                </Typography>
                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                  Single choice menu
                </Typography>
              </Box>
            </Box>
            {/* <Button onClick={toggleDrawer(anchor, false)} sx={{ minWidth: "auto", p: "0px" }}>
            <Image width={24} height={24} src={close} alt="close" />
          </Button> */}
          </Box>
          <Box sx={{ px: "24px", mt: "18px" }} component="form" noValidate autoComplete="off">
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              Header <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              sx={{
                borderRadius: "10px",
                border: headerError ? "3px solid red" : "",
                width: "100%",
              }}
              id="outlined-multiline-flexible"
              value={header}
              onChange={(e: any) => {
                setHeaderError(null);
                setHeader(e.target.value);
              }}
            />
            {headerError ? (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {headerError}
              </Typography>
            ) : (
              <Typography sx={{ color: "grey", fontWeight: 400, fontSize: "12px" }}>
                Max characters: 50
              </Typography>
            )}
          </Box>
          <Box
            sx={{ px: "24px", mt: "18px", borderBottom: "1px solid #DADADA", pb: "30px" }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              Text <span style={{ color: "red" }}>*</span>
            </Typography>
            <textarea
              style={{
                width: "100%",
                borderRadius: "10px",
                resize: "none",
                fontSize: "16px",
                fontWeight: "300",
                fontFamily: "Roboto",
                padding: "8px",
              }}
              id="outlined-multiline-flexible"
              rows={5}
              value={body}
              onChange={(e: any) => {
                setBodyError(null);
                setBody(e.target.value);
              }}
            />
            {/* <TextFieldWithoutLabel
              sx={{ borderRadius: "4px" }}
              id="outlined-multiline-flexible"
              label=""
              multiline={true}
              maxRows={4}
              value={body}
              onChange={(e: any) => {
                setBodyError(null);
                setBody(e.target.value);
              }}
            /> */}
            {bodyError && (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {bodyError}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ px: "24px", mt: "24px", borderBottom: "1px solid #DADADA", pb: "30px" }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              List Header / CTA <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              sx={{
                borderRadius: "10px",
                border: listHeaderError ? "3px solid red" : "",
                width: "100%",
              }}
              id="outlined-multiline-flexible"
              label=""
              value={listHeader}
              onChange={(e: any) => {
                setListHeaderError(null);
                setListHeader(e.target.value);
              }}
            />
            {listHeaderError ? (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {listHeaderError}
              </Typography>
            ) : (
              <Typography sx={{ color: "grey", fontWeight: 400, fontSize: "12px" }}>
                Max characters: 15
              </Typography>
            )}
          </Box>
          <Box sx={{ px: "24px", mt: "24px" }} component="form" noValidate autoComplete="off">
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              Section & Items
            </Typography>
            <Box
              sx={{
                bgcolor: "#00253F",
                p: "24px",
                borderRadius: "4px",
                border: listItemError ? "3px solid red" : "",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", mb: "8px" }}>
                {listItem &&
                  listItem.length > 0 &&
                  listItem.map((item: ListItemType, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: "#01CBD5",
                        borderRadius: "4px",
                        p: "8px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextFieldListButton
                        value={item["title"]}
                        onChange={(e) => {
                          updateItemNameById(item.id, e.target.value);
                        }}
                        sx={{
                          color: "#ffffff",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "22px",
                        }}
                      />
                      <Box>
                        <Button
                          onClick={() => {
                            removeItem(item.id);
                            deleteNode(item.id);
                          }}
                          sx={{
                            bgcolor: "transparent",
                            padding: "0",
                            minWidth: "auto",
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={deleteIconWhite}
                            alt="deleteIconWhite"
                          />
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Button
                onClick={() => {
                  handleListItem();
                  setListItemError("");
                }}
                sx={{
                  bgcolor: "#008DF1",
                  padding: "7px 25px",
                  width: "100%",
                  "&:hover": { backgroundColor: "#008DF1" },
                }}
              >
                <Typography
                  sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
                >
                  Add New Item
                </Typography>
              </Button>
            </Box>
            {listItemError && (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {listItemError}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "#CCD3D9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            py: "25px",
            borderRadius: "4px",
            mt: "24px",
          }}
        >
          <Typography
            sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
          >
            Apply changes?
          </Typography>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Button
              sx={{ border: "2px solid #707070", borderRadius: "4px", padding: "5px 20px" }}
              onClick={handleCancelNode}
            >
              <Typography
                sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
              >
                Cancel
              </Typography>
            </Button>
            <Button
              onClick={handleSaveNode}
              sx={{
                bgcolor: "#008DF1",
                padding: "7px 25px",
                "&:hover": {
                  backgroundColor: "#008DF1",
                },
              }}
            >
              <Typography
                sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
              >
                Apply
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      {/* <Box sx={{ position: "fixed", left: "400px", top: "20%", bgcolor: "white", width: "350px", height: "350px", borderRadius: "8px", overflow: "hidden" }}>
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    zIndex: "-1"
                }}
            >
                <Image src={whatsAppBg} alt="whatsAppBg" layout="fill" objectFit="cover" />
            </Box>
            <Box sx={{ zIndex: "9", bgcolor: "#ffffff", m: "24px 38px 8px 24px", p: "8px", borderRadius: "4px" }}>
                <Typography sx={{ color: "#1F1F1F", fontSize: "14px", fontWeight: "500" }}>Welcome to Fortune Hotels</Typography>
                <Typography sx={{ color: "#79767D", fontSize: "12px", fontWeight: "400" }}>We are delighted to have you dine with us.</Typography>
            </Box>
            <Box sx={{ zIndex: "9", bgcolor: "#ffffff", m: "0px 38px 24px 24px", p: "8px", borderRadius: "4px" }}>
                <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>View Menu</Typography>
            </Box>
            <Box sx={{ zIndex: "9", bgcolor: "#ffffff", mt: "24px", p: "8px", borderRadius: "4px", height: "100%" }}>
                <Typography sx={{ color: "#1F1F1F", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>View Menu</Typography>
                <FormControl sx={{ width: "100%" }}>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Vegetarian"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel sx={{
                            justifyContent: "space-between", px: "8px", m: "24px 0 14px 0",
                            "& .MuiFormControlLabel-label": {
                                fontSize: "14px", // Set the font size to 14
                            },
                        }} value="Vegetarian" labelPlacement="start" control={<Radio />} label="Vegetarian" />
                        <FormControlLabel value="Non - Vegetarian" sx={{
                            justifyContent: "space-between", px: "8px", m: "0",
                            "& .MuiFormControlLabel-label": {
                                fontSize: "14px", // Set the font size to 14
                            },
                        }} labelPlacement="start" control={<Radio />} label="Non - Vegetarian" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box> */}
    </>
  );
};
