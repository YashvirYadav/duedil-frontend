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
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;

}

export const Toast: React.FC<ToastProps> = ({
  open,
  handleClose,
  message,
  severity,
  setShowToast
}) => {
  const handleClick = () => {
    console.log("handleClick");
    setShowToast(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClick}>
      <div>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
};
