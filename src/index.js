import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
import PrivateRoute from "./utils/PrivateRoute";
import LoggedRoute from "./utils/LoggedRoute";
import Page404 from "./Components/Page404";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task" element={<EditTask />} />
      </Route>
      <Route element={<LoggedRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
