import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

import Rooms from "../pages/Rooms";
import Devices from "../pages/Devices";
import Energy from "../pages/Energy";
import Alerts from "../pages/Alerts";
import Analytics from "../pages/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { index: true, element: <Home /> },       
      { path: "rooms", element: <Rooms /> },     
      { path: "devices", element: <Devices /> },
      { path: "energy", element: <Energy /> },
      { path: "alerts", element: <Alerts /> },
      { path: "analytics", element: <Analytics /> }, 
    ],
  },
]);
