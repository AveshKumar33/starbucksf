import { Box, Button, List, ListItem } from "@mui/material";
import React from "react";
import logoIcon from "@/assets/images/logoicon.svg";
import Image from "next/image";
import DashboardIcon from "@/assets/images/dashboard.svg";
import ChatIcon from "@/assets/images/chat.svg";
import DashboardActive from "@/assets/images/dashboard-active.svg";
import ChatIconActive from "@/assets/images/chat-active.svg";
import QrScannerActive from "@/assets/images/qr_code_scanner-active.png";
import PersonProfile from "@/assets/images/personProfile.svg";
import PersonProfileActive from "@/assets/images/person-profile-active.png";
import QrScanner from "@/assets/images/qrScannerIcon.svg";
import RobotIcon from "@/assets/images/robotIcon.svg";
import SettingIcon from "@/assets/images/settingsIcon.svg";
import settingIconActive from "@/assets/images/settings-active.png";
import Roboticonactive from "@/assets/images/robot_active.png";
import IndicatorSVG from "@/assets/images/indicator.svg";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import "@/assets/styles/tooltip.scss";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Box
      sx={{
        background: "#fff",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        zIndex: 2,
      }}
      className="tooltip-design"
    >
      <Box
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`)}
        sx={{ cursor: "pointer", marginTop: "14px" }}
      >
        <Image src={logoIcon} alt="Home Icon" />
      </Box>
      <Box sx={{ paddingTop: "38px" }}>
        <List>
          <ListItem sx={{ padding: "14px 14px 53px 14px", position: "relative" }}>
            <Button
              sx={{ padding: "0", margin: "0", minWidth: "auto" }}
              onClick={() => router.push("/dashboard")}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content="Dashboard"
            >
              {pathname === "/dashboard" ? (
                <Image src={DashboardActive} alt="Create ChatBot" />
              ) : (
                <Image src={DashboardIcon} alt="Create ChatBot" />
              )}
            </Button>

            {pathname === "/dashboard" && (
              <Image
                src={IndicatorSVG}
                alt="Active Class"
                style={{ position: "absolute", right: 0 }}
              />
            )}
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem", position: "relative" }}>
            <Button
              sx={{ padding: "0", margin: "0", minWidth: "auto" }}
              onClick={() => router.push("/dashboard/conversations")}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content="Conversations"
            >
              {pathname === "/dashboard/conversations" ? (
                <Image src={ChatIconActive} alt="Create ChatBot" />
              ) : (
                <Image src={ChatIcon} alt="Create ChatBot" />
              )}
            </Button>
            {pathname === "/dashboard/conversations" && (
              <Image
                src={IndicatorSVG}
                alt="Active Class"
                style={{ position: "absolute", right: 0 }}
              />
            )}
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem", position: "relative" }}>
            <Button
              sx={{ padding: "0", margin: "0", minWidth: "auto" }}
              onClick={() => router.push("/dashboard/contacts")}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content="Contacts"
            >
              {pathname === "/dashboard/contacts" ? (
                <Image src={PersonProfileActive} alt="Create ChatBot" />
              ) : (
                <Image src={PersonProfile} alt="Creat e ChatBot" />
              )}
            </Button>
            {pathname === "/dashboard/contacts" && (
              <Image
                src={IndicatorSVG}
                alt="Active Class"
                style={{ position: "absolute", right: 0 }}
              />
            )}
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem", position: "relative" }}>
            <Button
              sx={{ padding: "0", margin: "0", minWidth: "auto" }}
              onClick={() => router.push("/dashboard/qrcode")}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content="QR Generator"
            >
              {pathname === "/dashboard/qrcode" ? (
                <Image src={QrScannerActive} alt="Create ChatBot" />
              ) : (
                <Image src={QrScanner} alt="Create ChatBot" />
              )}
            </Button>

            {pathname === "/dashboard/qrcode" && (
              <Image
                src={IndicatorSVG}
                alt="Active Class"
                style={{ position: "absolute", right: 0 }}
              />
            )}
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem", position: "relative" }}>
            <Button
              sx={{ padding: "0", margin: "0", minWidth: "auto" }}
              onClick={() => router.push("/dashboard/chatbot")}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content="Bot Builder"
            >
              {pathname === "/dashboard/chatbot" ? (
                <Image src={Roboticonactive} alt="Create ChatBot" />
              ) : (
                <Image src={RobotIcon} alt="Create ChatBot" />
              )}
            </Button>
            {pathname === "/dashboard/chatbot" && (
              <Image
                src={IndicatorSVG}
                alt="Active Class"
                style={{ position: "absolute", right: 0 }}
              />
            )}
          </ListItem>
          <ListItem sx={{ paddingBottom: "3.3125rem", position: "relative" }}>
            <Button
              sx={{ padding: "0", margin: "0", minWidth: "auto" }}
              onClick={() => router.push("/dashboard/settings")}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content="Settings"
            >
              {pathname === "/dashboard/settings" ? (
                <Image src={settingIconActive} alt="Create ChatBot" />
              ) : (
                <Image src={SettingIcon} alt="Create ChatBot" />
              )}
            </Button>

            {pathname === "/dashboard/settings" && (
              <Image
                src={IndicatorSVG}
                alt="Active Class"
                style={{ position: "absolute", right: 0 }}
              />
            )}
          </ListItem>
        </List>
      </Box>
      <Tooltip id="sidebar-tooltip" className="common-tooltip" place="right" />
    </Box>
  );
};
export default SideBar;
