import { Box, List, ListItem } from "@mui/material";
import React from "react";
import logoIcon from "../../../assets/images/logoicon.svg";
import Image from "next/image";
// import DashboardIcon from "../../../assets/images/dashboard.svg";
import ChatIcon from "../../../assets/images/chat.svg";
import DashboardActive from "../../../assets/images/dashboard-active.svg";
// import ChatIconActive from "../../../assets/images/chat-active.svg";
// import QrScannerActive from "../../../assets/images/qr"
import PersonProfile from "../../../assets/images/personProfile.svg";
// import PersonProfileActive from "../../../assets/images/person-profile-active.png";
import QrScanner from "../../../assets/images/qrScannerIcon.svg";
import RobotIcon from "../../../assets/images/robotIcon.svg";
import SettingIcon from "../../../assets/images/settingsIcon.svg";
// import settingIconActive from "../../../assets/images/settings-active.png";
// import Roboticonactive from "../../../assets/images/robot_active.png";
// import DraftsIcon from '@mui/icons-material/Drafts';

export const SideBar = () => {
  return (
    <Box
      sx={{
        background: "#fff",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        position: 'fixed',
        boxShadow:'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }}
    >
      <Box>
        <Image src={logoIcon} alt="Create ChatBot" />
      </Box>
      <Box sx={{ paddingTop: "38px" }}>
        <List>
          <ListItem sx={{  padding: "14px 14px 53px 14px"}} className="activeNav">
            <Box sx={{ cursor: "pointer" }}>
            {/* <Image src={DashboardIcon} alt="Create ChatBot" /> */}
              <Image src={DashboardActive} alt="Create ChatBot" />
            </Box>
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem" }}>
            <Box sx={{ cursor: "pointer" }}>
              <Image src={ChatIcon} alt="Create ChatBot" />
              {/* <Image src={ChatIconActive} alt="Create ChatBot" /> */}

            </Box>
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem" }}>
            <Box sx={{ cursor: "pointer" }}>
              <Image src={PersonProfile} alt="Creat e ChatBot" />
              {/* <Image src={PersonProfileActive} alt="Create ChatBot" /> */}
            </Box>
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem" }}>
            <Box sx={{ cursor: "pointer" }}>
              <Image src={QrScanner} alt="Create ChatBot" />
              {/* <Image src={QrScannerActive} alt="Create ChatBot" /> */}
            </Box>
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem" }}>
            <Box sx={{ cursor: "pointer" }}>
              {/* <Image src={Roboticonactive} alt="Create ChatBot" /> */}
              <Image src={RobotIcon} alt="Create ChatBot" />
            </Box>
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem" }}>
            <Box sx={{ cursor: "pointer" }}>
              {/* <Image src={settingIconActive} alt="Create ChatBot" /> */}
              <Image src={SettingIcon} alt="Create ChatBot" />
            </Box>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
