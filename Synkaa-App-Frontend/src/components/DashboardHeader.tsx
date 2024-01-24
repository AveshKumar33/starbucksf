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
import { useUser } from "@auth0/nextjs-auth0/client";

const DashboardHeader = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userProfile, setUserProfile] = React.useState<any>();
  const open = Boolean(anchorEl);

  // Getting Access Token for triggering Management APIs
  async function getAccessToken() {
    setApiLoading(true);
    try {
      const tokenResult = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-access-token`, {
        method: "POST",
      });
      if (tokenResult.status === 200) {
        const data = await tokenResult.json();

        if (user) {
          const userResult = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-profile?acessToken=${data.accessToken}&userId=${user.sub}`,
          );
          if (userResult.status === 200 || userResult.status === 201) {
            const userData = await userResult.json();
            setUserProfile(userData.userInfo);
          } else {
            // No user found set the package user
            setUserProfile(user);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setApiLoading(false);
  }

  React.useEffect(() => {
    getAccessToken();
  }, []);

  if (user) {
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

    // style---menu--item
    return (
      <>
        {" "}
        <Box>
          {apiLoading && <LoaderGlobal />}
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
              Welcome <span style={{ fontWeight: 600 }}>&nbsp;{userProfile?.name}!</span>
            </Typography>
          </Box>
          <Typography sx={{ color: "#808080" }} variant="caption">
            {" "}
            Have a look at what all happened when you were gone.
          </Typography>
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
  } else if (isLoading) {
    return <LoaderGlobal />;
  } else {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    return <main></main>;
  }
};

export default DashboardHeader;
