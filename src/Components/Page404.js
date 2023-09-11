import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <center style={{ marginTop: 50 }}>Page not found move to Login</center>
      <center>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </center>
    </>
  );
};

export default Page404;
