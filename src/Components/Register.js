import React, { useState } from "react";
import "../assets/css/register.css";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import loginapi from "../axios/login";
import registerValidation from "../validation/validateRegister";
import ToastComponent from "./ToastComponent";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackBar, setSnackBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("Something went wrong.");

  const handleRegister = async () => {
    const { errors, isValid } = registerValidation(userData);
    await setFormErrors(errors);
    if (isValid) {
      try {
        const res = await loginapi.post("/register/", userData);
        if (res.status === 201) {
          await navigate("/login");
        }
      } catch (error) {
        if (error.message === "Network Error" && !error.response) {
          await setSnackBar(true);
        } else {
          await setToastMessage(
            error.response.data.username
              ? error.response.data.username
              : error.response.data.password
          );
          await setSnackBar(true);
        }
      }
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
      <div className="login-container">
        <Container maxWidth="sm">
          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  align="center"
                  gutterBottom
                >
                  Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Username"
                        name="username"
                        variant="outlined"
                        onChange={(e) =>
                          setUserData({ ...userData, username: e.target.value })
                        }
                      />
                      <div className="error-color">
                        {formErrors && formErrors.username}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        variant="outlined"
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                      />
                      <div className="error-color">
                        {formErrors && formErrors.password}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="margin-t4">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleRegister}
                    >
                      Sign Up
                    </Button>
                  </div>
                  <div className="margin-t4 link-property">
                    <Typography
                      align="right"
                      gutterBottom
                      onClick={() => navigate("/login")}
                    >
                      Already have an account? Sign in
                    </Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Register;
