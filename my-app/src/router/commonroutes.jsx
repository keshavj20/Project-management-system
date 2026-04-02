import { createBrowserRouter } from "react-router-dom";

import MyTask from "../View/task/myTask.jsx";
import MyProject from "../View/project/myProject.jsx";
import Slide from "../View/SideBar.jsx";
import ProjectDetail from "../View/project/team.jsx";
import Task from "../View/project/task.jsx";
import Login from "../View/login/login.jsx";
Login;

const routers = {
  path: "/",
  element: <Slide />,
  children: [
    {
      path: "my-project",
      element: <MyProject />,
    },
    {
      path: "my-task",
      element: <MyTask />,
    },
    {
      path: "my-project/detail",
      element: <ProjectDetail />,
    },
    {
      path: "my-project/detail/task",
      element: <Task />,
    },
    {
      path: "my-project/detail/team",
      element: <ProjectDetail />,
    },
  ],
};

export default routers;
