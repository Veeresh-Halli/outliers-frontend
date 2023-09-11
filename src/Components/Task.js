import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Switch,
} from "@material-ui/core";
import "../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import taskAPI from "../axios/task";
import ToastComponent from "./ToastComponent";

const Task = ({ task, fetchAllTasks }) => {
  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("Something went wrong.");

  const handleEditTask = async (taskID) => {
    await localStorage.setItem("TaskID", taskID);
    await navigate("/edit-task");
  };

  const handleDeleteTask = async (taskID) => {
    try {
      const deleteTask = await taskAPI.delete(`/tasks/${taskID}/`);
      if (deleteTask.status === 200) {
        console.log("Task Deleted Successfully");
        await fetchAllTasks();
      }
    } catch (error) {
      console.log("DELELTE ROOR", error);
      await setSnackBar(true);
    }
  };

  const handleToggle = async (taskID, taskStatus) => {
    try {
      const deleteTask = await taskAPI.post(`/tasks/${taskID}/toggle/`, {
        completed: !taskStatus,
      });
      if (deleteTask.status === 200) {
        console.log("Task Status Changed Successfully");
        await fetchAllTasks();
      }
    } catch (error) {
      console.log("Error While Toggling the Task", error);
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
      <div className="margin-t2">
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <Typography component="h1" variant="h5" align="left">
                  {task?.title}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justifyContent="flex-end" spacing={0}>
                  <Grid item>
                    {task?.completed ? (
                      <>
                        <Grid container spacing={0}>
                          <Grid item>
                            <Typography component="h6" variant="h6">
                              Completed
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Switch
                              checked={task?.completed}
                              onChange={() =>
                                handleToggle(task?.task_id, task?.completed)
                              }
                              color="primary"
                              name="isCompleted"
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid container spacing={0}>
                          <Grid item>
                            <Typography component="h6" variant="h6">
                              Not Completed
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Switch
                              checked={task?.completed}
                              onChange={() =>
                                handleToggle(task?.task_id, task?.completed)
                              }
                              color="primary"
                              name="isCompleted"
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      className="cursor spacing"
                      onClick={() => handleEditTask(task?.task_id)}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="cursor spacing"
                      onClick={() => handleDeleteTask(task?.task_id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Task;
