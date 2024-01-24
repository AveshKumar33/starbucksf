import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SelectWithoutLabel = styled(Select)({
  "& .MuiSelect-root": {
    width: "100%",
  },
  "& .MuiSelect-select": {
    padding: "0px 0px 2px 5px",
    height: "40px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#79767D",
    borderRadius: "4px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#008DF1",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#008DF1",
  },
});
