import {
  Cpu,
  Fan,
  Lightbulb,
  CheckCircle,
  XCircle,
} from "lucide-react";

const rooms = [
  {
    name: "Drawing Room",
    fans: 2,
    lights: 3,
    on: 4,
    off: 1,
  },
  {
    name: "Work Room 1",
    fans: 2,
    lights: 3,
    on: 5,
    off: 0,
  },
  {
    name: "Work Room 2",
    fans: 2,
    lights: 3,
    on: 3,
    off: 2,
  },
];

const activities = [
  "Drawing Room Light 2 turned ON",
  "Work Room 1 Fan 1 speed changed",
  "Work Room 2 Light 3 turned OFF",
  "Drawing Room Fan 2 turned ON",
];

function Devices() {
  return (
    <div className="p-6 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5">

        <div className="bg-[#141b2d] rounded-xl p-5">
          <Cpu className="text-green-400 mb-3" size={28} />
          <p className="text-gray-400">Total Devices</p>
          <h2 className="text-3xl text-white font-bold">15</h2>
        </div>

        <div className="bg-[#141b2d] rounded-xl p-5">
          <CheckCircle className="text-green-500 mb-3" size={28} />
          <p className="text-gray-400">Devices ON</p>
          <h2 className="text-3xl text-green-400 font-bold">12</h2>
        </div>

        <div className="bg-[#141b2d] rounded-xl p-5">
          <XCircle className="text-red-500 mb-3" size={28} />
          <p className="text-gray-400">Devices OFF</p>
          <h2 className="text-3xl text-red-400 font-bold">3</h2>
        </div>


      </div>

      {/* Device Types */}
      <div className="grid grid-cols-2 gap-5">

        <div className="bg-[#141b2d] rounded-xl p-5 flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-semibold">Fans</h2>
            <p className="text-gray-400">6 Installed</p>
          </div>

          <Fan size={55} className="text-cyan-400" />
        </div>

        <div className="bg-[#141b2d] rounded-xl p-5 flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-semibold">Lights</h2>
            <p className="text-gray-400">9 Installed</p>
          </div>

          <Lightbulb size={55} className="text-yellow-400" />
        </div>

      </div>

      {/* Room Summary */}
      <div className="bg-[#141b2d] rounded-xl p-6">

        <h2 className="text-white text-xl font-semibold mb-5">
          Room-wise Devices
        </h2>

        <div className="space-y-5">

          {rooms.map((room) => (
            <div key={room.name}>

              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="text-white">{room.name}</h3>

                  <p className="text-gray-400 text-sm">
                    {room.fans} Fans • {room.lights} Lights
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-400">
                    ON: {room.on}
                  </p>

                  <p className="text-red-400">
                    OFF: {room.off}
                  </p>
                </div>
              </div>

              <div className="bg-[#27324a] rounded-full h-2">

                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(room.on / 5) * 100}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-[#141b2d] rounded-xl p-6">

        <h2 className="text-white text-xl font-semibold mb-5">
          Recent Device Activity
        </h2>

        <div className="space-y-3">

          {activities.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-700 pb-3"
            >
              <p className="text-gray-300">{item}</p>

              <span className="text-green-400 text-sm">
                Just now
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Devices;