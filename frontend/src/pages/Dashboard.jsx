import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/websocket";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router";

function Dashboard() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    api.get("/devices").then((res) => {
      setDevices(res.data || []);
    });
  }, []);

  useEffect(() => {
    socket.onmessage = (event) => {
      try {
        const updated = JSON.parse(event.data);
        // console.log("WS RECEIVED:", updated);
        setDevices((prev) =>
          prev.map((d) =>
            d.id === updated.id ? updated : d
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <div className="bg-[#0b0f19] min-h-screen">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-6">
          <Outlet context={{ devices }} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
