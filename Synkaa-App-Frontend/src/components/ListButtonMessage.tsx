import { Typography } from "@mui/material";
import blueIcon from "@/assets/images/blueIcon.svg";
import React from "react";
import Image from "next/image";

const ListButtonMessage = ({ messageData }: any) => {
  const innerData = JSON.parse(messageData);

  return (
    <>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#5E5E5E",
        }}
      >
        {innerData.text.header}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#5E5E5E",
        }}
      >
        {innerData.text.body}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#008DF1",
          textAlign: "center",
          py: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image width={24} height={24} src={blueIcon} alt="Menu Icon" />
        {innerData.text.listHeader}
      </Typography>
    </>
  );
};

export default ListButtonMessage;
