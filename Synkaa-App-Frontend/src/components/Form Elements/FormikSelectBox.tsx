import { SelectWithoutLabel } from "@/theme/materialComponents/SelectBox";
import { Typography } from "@mui/material";
import { useField } from "formik";

export function FormikSelectBox({ ...props }: any) {
  const [field, meta] = useField(props);
  return (
    <>
      <SelectWithoutLabel
        {...field}
        {...props}
        variant="outlined"
        sx={{ width: "100%", height: "40px" }}
      >
        {props.children}
      </SelectWithoutLabel>
      {meta.touched && meta.error ? (
        <Typography sx={{ color: "red", fontSize: "16px", mt: "4px" }}>
          Please select option
        </Typography>
      ) : null}
    </>
  );
}
