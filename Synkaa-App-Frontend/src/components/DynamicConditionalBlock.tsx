import { Box, Typography, Button, Popover, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import deleteIconGrey from "@/assets/images/deleteIconGrey.svg";
import phoneNumber from "@/assets/images/phoneNumber.svg";

import { FormikInput } from "./Form Elements/FormikInput";
import { FormikSelectBox } from "./Form Elements/FormikSelectBox";
import { FormikToggleButton } from "./Form Elements/FormikToggleButton";

type DynamicConditionalBlockProps = {
  index: number;
  onDelete: any;
  setFieldValue: any;
};

export function DynamicConditionalBlock({
  onDelete,
  index,
  setFieldValue,
}: DynamicConditionalBlockProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      key={index}
      sx={{
        bgcolor: "#F4F4F4",
        p: "16px 16px 32px 16px",
        my: "16px",
        mx: "8px",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <FormikToggleButton
          name={`dynamicConditions[${index}].gate`}
          setFieldValue={setFieldValue}
          index={index}
        />
        <Button
          onClick={onDelete}
          sx={{ bgcolor: "transparent", minWidth: "auto", "&:hover": { bgcolor: "transparent" } }}
        >
          <Image width={24} height={24} src={deleteIconGrey} alt="deleteIconGrey" />
        </Button>
      </Box>

      <Box sx={{ mt: "16px" }}>
        <FormikInput
          id={id}
          handleClick={handleClick}
          name={`dynamicConditions[${index}].operand1`}
          showVariableButton={true}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ border: "1px soild rgba(0, 0, 0, 0.10)", py: "8px", width: "300px" }}>
            <Typography
              sx={{ color: "#5E5E5E", fontSize: "16px", fontWeight: "400", mx: "16px", my: "8px" }}
            >
              Lead Data
            </Typography>
            <Box>
              <Box
                onClick={() => {
                  setFieldValue(`dynamicConditions[${index}].operand1`, "Name");
                  handleClose();
                }}
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mx: "16px",
                  my: "8px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#8700F0",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "24px",
                    height: "24px",
                  }}
                >
                  <Typography sx={{ color: "#ffffff", fontSize: "14px", fontWeight: "400" }}>
                    S
                  </Typography>
                </Box>
                <Typography sx={{ color: "#5E5E5E", fontSize: "16px", fontWeight: "400" }}>
                  Name
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  setFieldValue(`dynamicConditions[${index}].operand1`, "Phone Number");
                  handleClose();
                }}
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mx: "16px",
                  my: "8px",
                  cursor: "pointer",
                }}
              >
                <Image width={24} height={24} src={phoneNumber} alt="phoneNumber" />
                <Typography sx={{ color: "#5E5E5E", fontSize: "16px", fontWeight: "400" }}>
                  Phone Number
                </Typography>
              </Box>
            </Box>
          </Box>
        </Popover>
      </Box>
      <Box sx={{ my: "16px", width: "100%" }}>
        <FormikSelectBox name={`dynamicConditions[${index}].operator`}>
          <MenuItem sx={{ color: "#000" }} value="Equals to">
            <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>
              Equals to
            </Typography>
          </MenuItem>
          <MenuItem value="Does Not Equals to">
            <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>
              Does Not Equals to
            </Typography>
          </MenuItem>
          <MenuItem value="Contains">
            <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>
              Contains
            </Typography>
          </MenuItem>
          {/* <MenuItem value="Greater than">
            <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>
              Greater than
            </Typography>
          </MenuItem>
          <MenuItem value="Less than">
            <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>
              Less than
            </Typography>
          </MenuItem> */}
        </FormikSelectBox>
      </Box>
      <Box>
        <FormikInput
          id={id}
          handleClick={handleClick}
          name={`dynamicConditions[${index}].operand2`}
          showVariableButton={false}
        />
      </Box>
    </Box>
  );
}
