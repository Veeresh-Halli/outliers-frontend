import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import loginapi from "../axios/login";
import ToastComponent from "./ToastComponent";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [snackBar, setSnackBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("Something went wrong.");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const handleLogout = async () => {
    try {
      const logoutAPI = await loginapi.post("/logout/", null, config);
      if (logoutAPI.status === 200) {
        await localStorage.removeItem("Token");
        await navigate("/login");
      }
    } catch (error) {
      console.log(error);
      await setSnackBar(true);
    }
  };

  const handleSnackBar = async () => {
    await setSnackBar(false);
  };

  return (
    <>
      <ToastComponent
        onClose={handleSnackBar}
        open={snackBar}
        severity="error"
        message={toastMessage}
      />
      <AppBar position="static">
        <Toolbar>
          <Grid container xs={12} spacing={2} justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">To-Do App</Typography>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
