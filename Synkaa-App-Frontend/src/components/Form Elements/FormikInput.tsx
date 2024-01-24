import { TextFieldWithoutLabel } from "@/theme/materialComponents/TextField";
import { InputAdornment, Button, Typography } from "@mui/material";
import { useField } from "formik";

export function FormikInput({ handleClick, id, showVariableButton, ...props }: any) {
  const [field, meta] = useField(props);

  return (
    <>
      <TextFieldWithoutLabel
        autoComplete="off"
        {...field}
        {...props}
        InputProps={{
          endAdornment: showVariableButton && (
            <InputAdornment position="start">
              <Button
                aria-describedby={id}
                onClick={handleClick}
                sx={{
                  bgcolor: "#C9E9FF",
                  px: "10px",
                  py: "4px",
                  borderRadius: "25px",
                  "&:hover": {
                    backgroundColor: "#C9E9FF",
                  },
                }}
              >
                <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500" }}>
                  Variable
                </Typography>
              </Button>
            </InputAdornment>
          ),
        }}
      />
      {meta.touched && meta.error ? (
        <Typography sx={{ color: "red", fontSize: "16px", mt: "4px" }}>Field is empty</Typography>
      ) : null}
    </>
  );
}
