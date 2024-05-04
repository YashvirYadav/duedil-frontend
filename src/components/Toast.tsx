import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ToastProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: "error" | "success" | "info" | "warning" | "error";
}

export const Toast: React.FC<ToastProps> = ({
  open,
  handleClose,
  message,
  severity,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <div>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
};
