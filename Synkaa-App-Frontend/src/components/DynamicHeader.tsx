"use client";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateChatBot from "@/assets/images/CreateChatbot.svg";
import QrScanner from "@/assets/images/qaScanner.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import theme from "@/theme/theme";
import ChatbotServices from "@/services/chatbot.services";
import { useRouter } from "next/navigation";
import { QrDialog } from "./Qrdialog";
import LoaderGlobal from "./LoaderGlobal";

interface DynamicHeaderProps {
  pathname: string;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ pathname }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("Admin");
    const logoutLink = document.createElement("a");
    logoutLink.href = `/api/auth/logout`;
    logoutLink.click();
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpenModal(!openModal);
  };

  const createChatbot = async () => {
    setAnchorEl(null);
    setButtonDisabled(true);
    const flowData = {
      nodes: [],
      edges: [],
    };
    const date_now = new Date();
    const month_calculate = Number(date_now.getMonth()) + 1;
    //generate random bot name
    const chatbotName =
      "Bot-" + date_now.getDate() + "-" + month_calculate + "-" + date_now.getTime();

    setApiLoading(true);
    const result = await ChatbotServices.postChatbot(chatbotName, flowData);
    if (result) {
      if (result.success && result.data._id) {
        router.push("/dashboard/chatbot/" + result.data._id);
        setButtonDisabled(false);
      } else {
        setButtonDisabled(false);
      }
    } else {
      setButtonDisabled(false);
    }
    setApiLoading(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {" "}
      <Box>
        {apiLoading && <LoaderGlobal />}
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            sx={{
              fontWeight: "600",
              fontSixze: "24px",
              paddingLeft: "4px",
              letterSpacing: "0.064px",
            }}
            variant="subtitle1"
          >
            {pathname === "/dashboard/contacts" ? (
              "Contacts"
            ) : (
              <>
                {pathname === "/dashboard/conversations" ? (
                  "Conversations"
                ) : (
                  <>
                    {pathname === "/dashboard/qrcode" ? (
                      "Table QR Generator"
                    ) : (
                      <>
                        {pathname === "/dashboard/settings" ? (
                          "Settings"
                        ) : (
                          <>{pathname === "/dashboard/chatbot" && "Chatbot"}</>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginRight: "50px" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          endIcon={<ArrowDropDownIcon />}
        >
          Quick Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => createChatbot()} disabled={buttonDisabled}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image style={{ paddingRight: "2px" }} src={CreateChatBot} alt="Create ChatBot" />
              Create Chatbot
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image style={{ paddingRight: "2px" }} src={QrScanner} alt="Create ChatBot" />
              Create QR
            </Box>
          </MenuItem>
          <MenuItem onClick={clearLocalStorage}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LogoutIcon
                sx={{
                  color: theme.palette.secondary.main,
                  paddingRight: "2px",
                }}
              />
              Logout
            </Box>
          </MenuItem>
        </Menu>
        <QrDialog selectedValue={""} open={openModal} onClose={handleClickOpen} refresh={null} />
      </Box>
    </>
  );
};

export default DynamicHeader;
