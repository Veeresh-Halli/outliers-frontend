import React, { useEffect, useState } from "react";
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
  const taskID = localStorage.getItem("TaskID");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackBar, setSnackBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("Something went wrong.");

  useEffect(() => {
    async function getTaskDetails() {
      if (taskID) {
        try {
          const getTask = await taskAPI.get(`/tasks/${taskID}/`);
          if (getTask.status === 200) {
            await setTaskData(getTask.data);
          }
        } catch (error) {
          // await setToastMessage(error.response.data);
          await setSnackBar(true);
        }
      } else {
        await navigate("/dashboard");
      }
    }
    getTaskDetails();
  }, []);

  const handleTaskUpdation = async () => {
    const { errors, isValid } = TaskValidation(taskData);
    await setFormErrors(errors);
    if (isValid) {
      try {
        const updateTask = await taskAPI.put(`/tasks/${taskID}/`, taskData);
        if (updateTask.status === 200) {
          await localStorage.removeItem("TaskID");
          await navigate("/dashboard");
        }
      } catch (error) {
        if (error.message === "Network Error" && !error.response) {
          await setSnackBar(true);
        } else {
          if (error.status === 404) {
            await setToastMessage("TaskID Doesn't Exists");
            await setSnackBar(true);
          }
        }
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
                  Edit Task
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
                        value={taskData?.title}
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
                        value={taskData?.description}
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
                      onClick={handleTaskUpdation}
                    >
                      Update
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
