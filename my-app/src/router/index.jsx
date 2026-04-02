import { createBrowserRouter } from "react-router-dom";
import Login from "../View/login/login.jsx";
import LandingPage from "../View/landingPage.jsx";
import Register from "../View/login/register.jsx";
import routers from "./commonroutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  routers,
]);

export default router;
