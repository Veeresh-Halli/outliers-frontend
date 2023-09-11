import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const ToastComponent = ({ open, onClose, severity, message }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastComponent;
