import React from "react";
import Typography from "@mui/material/Typography";

interface CustomTextSizeProps {
  text: any;
  firstFont: string;
  secondFont: string;
  thirdFont: string;
  fontWeight: number;
}

const CustomText: React.FC<CustomTextSizeProps> = ({
  text,
  firstFont,
  secondFont,
  thirdFont,
  fontWeight,
}) => {
  // Calculate font size based on text length
  const calculateFontSize = (text: any) => {
    if (text.length < 12) {
      return firstFont;
    } else if (text.length < 14) {
      return secondFont;
    } else {
      return thirdFont;
    }
  };

  const fontSize = calculateFontSize(text);

  return <Typography sx={{ fontSize, color: "#fff", fontWeight }}>{text}</Typography>;
};

export default CustomText;
