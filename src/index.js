import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import BoardProvider from "./context/Board";
import ListProvider from "./context/List";
import TaskProvider from "./context/Task";
import "./index.css";
import { ourRouter } from "./router/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BoardProvider>
      <ListProvider>
        <TaskProvider>
          <RouterProvider router={ourRouter} />
        </TaskProvider>
      </ListProvider>
    </BoardProvider>
  </React.StrictMode>
);
