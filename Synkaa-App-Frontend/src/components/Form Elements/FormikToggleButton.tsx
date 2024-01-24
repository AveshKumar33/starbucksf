import { ToggleButtonOperator } from "@/theme/materialComponents/ToggleButton";
import { ToggleButtonGroup } from "@mui/material";
import { useField } from "formik";

export function FormikToggleButton({ setFieldValue, index, ...props }: any) {
  const [field] = useField(props);
  const handleChange = (event: any, newValue: any) => {
    setFieldValue(`dynamicConditions[${index}].gate`, newValue);
  };
  return (
    <>
      <ToggleButtonGroup
        {...field}
        value={field.value}
        exclusive
        aria-label="logic operator"
        onChange={handleChange}
      >
        <ToggleButtonOperator
          sx={{
            borderRadius: "25px",
            padding: "5px 20px",
            height: "100%",
            fontSize: "14px",
            "&:hover": { bgcolor: "#EBEBEB" },
          }}
          value="AND"
          aria-label="AND"
        >
          AND
        </ToggleButtonOperator>
        <ToggleButtonOperator
          sx={{
            borderRadius: "25px",
            padding: "5px 20px",
            height: "100%",
            fontSize: "14px",
            "&:hover": { bgcolor: "#EBEBEB" },
          }}
          value="OR"
          ria-label="OR"
        >
          OR
        </ToggleButtonOperator>
      </ToggleButtonGroup>
    </>
  );
}
