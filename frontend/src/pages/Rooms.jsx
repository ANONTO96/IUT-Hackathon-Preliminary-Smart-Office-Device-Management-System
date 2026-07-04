import { useOutletContext } from "react-router";

function Rooms() {
  const { devices = [] } = useOutletContext();

  const rooms = ["Drawing Room", "Work Room 1", "Work Room 2"];

  return (
    <div className="space-y-4">
      <h1 className="text-white text-xl font-bold">
        Room Summary
      </h1>

      {rooms.map(room => {
        const roomDevices = devices.filter(
          d => d.room === room
        );

        return (
          <div key={room} className="bg-[#141b2d] p-4 rounded-xl">
            <h2 className="text-white font-semibold">
              {room}
            </h2>

            <p className="text-gray-400">
              Devices: {roomDevices.length}
            </p>

            <p className="text-green-400">
              Active: {roomDevices.filter(d => d.status).length}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Rooms;