"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import contactUS from "../../assets/images/contactUS.svg";
import restaurant from "../../assets/images/restaurant.svg";
import phone from "../../assets/images/phone.svg";
import mail from "../../assets/images/mail.svg";
import location from "../../assets/images/location.svg";
import React from "react";

const ContactUs: React.FC = () => {
  return (
    <Box sx={{ p: "32px" }}>
      <Image
        src={contactUS}
        alt="contactUS"
        loading="lazy"
        width={1600}
        height={900}
        layout="responsive"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "86px",
          p: "47px",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "12px",
          }}
        >
          <Image src={restaurant} alt="restaurant" width={24} height={24} />
          <Typography
            sx={{ color: "#000", fontWeight: "400", fontSize: "18px", lineHeight: "20px" }}
          >
            Business Name
          </Typography>
        </Box>
        <Typography
          sx={{
            width: "70%",
            color: "#000",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          Synkaa Pte Ltd
        </Typography>

        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "12px",
          }}
        >
          <Image src={phone} alt="phone" width={24} height={24} />
          <Typography
            sx={{ color: "#000", fontWeight: "400", fontSize: "18px", lineHeight: "20px" }}
          >
            Phone Number
          </Typography>
        </Box>
        <Typography
          sx={{
            width: "70%",
            color: "#000",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          +6588797848
        </Typography>

        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "12px",
          }}
        >
          <Image src={mail} alt="mail" width={24} height={24} />
          <Typography
            sx={{ color: "#000", fontWeight: "400", fontSize: "18px", lineHeight: "20px" }}
          >
            Email Address
          </Typography>
        </Box>
        <Typography
          sx={{
            width: "70%",
            color: "#000",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          info@synkaa.com
        </Typography>

        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "12px",
          }}
        >
          <Image src={location} alt="location" width={24} height={24} />
          <Typography
            sx={{ color: "#000", fontWeight: "400", fontSize: "18px", lineHeight: "20px" }}
          >
            Restaurant Address
          </Typography>
        </Box>
        <Typography
          sx={{
            width: "70%",
            color: "#000",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          60 PAYA LEBAR ROAD #10-31 Singapore, Singapore 409051
        </Typography>
      </Box>
    </Box>
  );
};
export default ContactUs;
