import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import {
  Container,
  // Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Task from "./Task";
import taskAPI from "../axios/task";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState([]);

  const fetchAllTasks = async () => {
    const task = await taskAPI.get("/tasks/");
    if (task.status === 200) {
      await setTaskData(task.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    try {
      if (token !== null) {
        fetchAllTasks();
      }
    } catch (error) {
      localStorage.removeItem("Token");
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Container maxWidth="md">
          <Card variant="outlined">
            <CardContent>
              {/* <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              > */}
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Typography component="h1" variant="h5" gutterBottom>
                    Your Tasks
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/add-task")}
                    color="primary"
                  >
                    Add New Task
                  </Button>
                </Grid>
              </Grid>
              {taskData.length > 0 ? (
                taskData.map((task, index) => {
                  return (
                    <Task
                      key={index}
                      task={task}
                      fetchAllTasks={fetchAllTasks}
                    />
                  );
                })
              ) : (
                <center>Create your tasks</center>
              )}
              {/* </Box> */}
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
