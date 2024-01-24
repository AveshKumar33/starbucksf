import { ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ToggleButtonOperator = styled(ToggleButton)({
  "&.Mui-selected": {
    backgroundColor: "#008DF1",
    color: "white",
    "&:hover": {
      backgroundColor: "#008DF1",
      color: "white",
    },
  },
});
