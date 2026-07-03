import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router"

function Dashboard() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Sidebar></Sidebar>
    </div>
  )
}

export default Dashboard