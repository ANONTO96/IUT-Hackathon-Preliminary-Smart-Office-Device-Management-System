import { AlertTriangle, Clock, Lightbulb, Fan } from "lucide-react";

function Alerts() {
  const currentHour = new Date().getHours();

  const rooms = [
  {
    room: "Drawing Room",
    on: 4,
    off: 1,
    activeDevices: [
  { name: "Light 1", type: "light" },
  { name: "Light 2", type: "light" },
  { name: "Fan 1", type: "fan" },
  { name: "Fan 2", type: "fan" },
],
  },
  {
    room: "Work Room 1",
    on: 5,
    off: 0,
    activeDevices: [
  {name: "Light 1",type: "light",},
  {name: "Light 2",type: "light",},
  {name: "Light 3",type: "light",},
  {name: "Fan 1",type: "fan",},
  {name: "Fan 2",type: "fan",},
],
  },
  {
    room: "Work Room 2",
    on: 3,
    off: 2,
    activeDevices: [
      { name: "Light 1", type: "light" },
      { name: "Fan 1", type: "fan" },
      { name: "Fan 2", type: "fan" }, 
    ],
  },
];

  const officeClosed = currentHour >= 22;

  const totalActiveDevices = rooms.reduce(
  (sum, room) => sum + room.on,
  0
);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Alerts & Notifications
      </h1>

      {/* Office Hours Alert */}
      {officeClosed && totalActiveDevices > 0 && (
        <div className="bg-red-600/20 border border-red-500 rounded-xl p-5 flex items-start gap-4">

          <AlertTriangle
            className="text-red-500"
            size={40}
          />

          <div>

            <h2 className="text-red-400 text-xl font-bold">
              Office Hours Exceeded
            </h2>

            <p className="text-gray-300 mt-2">
              It is after <b>10:00 PM</b>, but some devices are still running.
            </p>

            <p className="text-white mt-3">
              Active Devices: {totalActiveDevices}
            </p>

          </div>

        </div>
      )}

      {/* Room Status */}
<div className="bg-[#141b2d] rounded-xl p-6">

  <h2 className="text-white text-xl font-semibold mb-5">
    Room Status
  </h2>

  <div className="space-y-6">

    {rooms.map((room) => (

      <div key={room.room}>

        <div className="flex justify-between items-center mb-2">

          <div>
            <h3 className="text-white text-lg">
              {room.room}
            </h3>

            <p className="text-gray-400 text-sm">
              Active Devices: {room.on}
            </p>
          </div>

          <div className="text-right">

            <p className="text-green-400 font-semibold">
              ON: {room.on}
            </p>

            <p className="text-red-400 font-semibold">
              OFF: {room.off}
            </p>

          </div>

        </div>

        <div className="w-full bg-[#27324a] rounded-full h-3">

          <div
            className="bg-green-500 h-3 rounded-full"
            style={{
              width: `${(room.on / (room.on + room.off)) * 100}%`,
            }}
          />

        </div>

        <div className="mt-3 flex flex-wrap gap-2">

          {room.activeDevices.map((device) => (
  <span
    key={device.name}
    className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1d263b] text-green-400 text-xs"
  >
    {device.type === "light" ? (
      <Lightbulb size={14} className="text-yellow-400" />
    ) : (
      <Fan size={14} className="text-blue-400" />
    )}

    {device.name}
  </span>
))}

        </div>

      </div>

    ))}

  </div>

</div>

      {/* Current Status */}
      <div className="bg-[#141b2d] rounded-xl p-5 flex items-center gap-4">

        <Clock
          className="text-blue-400"
          size={35}
        />

        <div>

          <p className="text-gray-400">
            Current Time
          </p>

          <h2 className="text-white text-2xl font-bold">
            {new Date().toLocaleTimeString()}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Alerts;