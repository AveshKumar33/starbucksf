import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TextFieldWithoutLabel = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root , .MuiInputBase-input": {
    height: "40px",
    padding: "0px 0px 2px 5px",
    "& fieldset": {
      borderColor: "#79767D",
      borderRadius: "4px",
    },
    "&:hover fieldset": {
      borderColor: "#008DF1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#008DF1",
    },
  },
});

export const TextFieldListButton = styled(TextField)({
  "& label.Mui-focused": {
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root , .MuiInputBase-input": {
    height: "auto",
    padding: "0",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "400",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
});
