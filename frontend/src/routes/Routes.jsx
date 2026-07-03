import { createBrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      
    ]
  },
]);

