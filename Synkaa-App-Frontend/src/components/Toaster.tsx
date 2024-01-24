import * as React from "react";
import { Box, Snackbar, Alert } from "@mui/material";

interface ToasterProps {
  open: boolean;
  message: string;
  severity: any;
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = (props) => {
  const { open, message, onClose, severity } = props;
  const vertical = "bottom";
  const horizontal = "right";

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Toaster;
