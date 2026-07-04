import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/websocket";

import SummaryCards from "../components/dashboard/SummaryCards";
import OfficeLayout from "../components/dashboard/OfficeLayout";


function Home() {
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

        setDevices((prev) =>
          prev.map((d) => (d.id === updated.id ? updated : d))
        );
      } catch (err) {
        console.log("WS error", err);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <SummaryCards devices={devices} />

      <OfficeLayout devices={devices} />

    </div>
  );
}

export default Home;