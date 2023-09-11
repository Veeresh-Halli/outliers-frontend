import React, { useState } from "react";
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
import TaskValidation from "../validation/validateTask";
import taskAPI from "../axios/task";
import { useNavigate } from "react-router-dom";
import ToastComponent from "./ToastComponent";

const AddTask = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackBar, setSnackBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("Something Went Wrong.");

  const handleTaskSubmission = async () => {
    const { errors, isValid } = TaskValidation(taskData);
    await setFormErrors(errors);
    if (isValid) {
      try {
        const addTask = await taskAPI.post("/tasks/", taskData);
        if (addTask.status === 201) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("eror", error);
        // await setToastMessage(error.response.data);
        await setSnackBar(true);
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
      <div className="task-container">
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
                  align="left"
                  gutterBottom
                >
                  Add Task
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        variant="outlined"
                        onChange={(e) =>
                          setTaskData({ ...taskData, title: e.target.value })
                        }
                      />
                      <div className="error-color">
                        {formErrors && formErrors.title}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        variant="outlined"
                        multiline
                        minRows="15"
                        onChange={(e) =>
                          setTaskData({
                            ...taskData,
                            description: e.target.value,
                          })
                        }
                      />
                      <div className="error-color">
                        {formErrors && formErrors.description}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="margin-t4">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleTaskSubmission}
                    >
                      Submit
                    </Button>
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

export default AddTask;
