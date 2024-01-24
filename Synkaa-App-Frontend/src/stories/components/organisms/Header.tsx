import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateChatBot from "../../../assets/images/CreateChatbot.svg";
import QrScanner from "../../../assets/images/qaScanner.svg";

export const Header = ({ headingType,heading }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState<boolean>(true)
  const [title, setTitle] = useState<boolean>(true)
  useEffect(() => {
    setShow(headingType)
    setTitle(headingType)
  }, [show, title])
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // style---menu--item
  return (
    <header>
      <Box
        sx={{
          minHeight: "68px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.15)",
          alignItems: "center",
          padding: "0 32px",
          position: "fixed",
          width: 'calc(100% - 60px)',
          left: '57px',
          zIndex: '2'
        }}
      >
        {title ?
          <Box>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              Welcome{" "}
              <Typography
                sx={{ fontWeight: "600", fontSize: "18px", paddingLeft: "4px" }}
              >
                Adam!
              </Typography>
            </Typography>
            <Typography sx={{ color: "#808080" }} variant="caption">
              {" "}
              Have a look at what all happened when you were gone.
            </Typography>
          </Box> :
          <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#1F1F1F" }}>{heading}</Typography>
        }

        {show ?
          <Box>
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
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image style={{ paddingRight: "2px" }} src={CreateChatBot} alt="Create ChatBot" />
                  Create Chatbot
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image style={{ paddingRight: "2px" }} src={QrScanner} alt="Create ChatBot" />
                  Create Chatbot
                </Box>
              </MenuItem>
            </Menu>
          </Box>
          :
          null}

      </Box>
    </header>
  );
};