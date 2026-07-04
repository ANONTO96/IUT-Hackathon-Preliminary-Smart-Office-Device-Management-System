import {
  BatteryCharging,
  DollarSign,
  Leaf,
  Zap,
} from "lucide-react";

const roomData = [
  {
    room: "Drawing Room",
    energy: 5.2,
    cost: 1.10,
  },
  {
    room: "Work Room 1",
    energy: 9.8,
    cost: 2.05,
  },
  {
    room: "Work Room 2",
    energy: 8.1,
    cost: 1.75,
  },
];

const tips = [
  "Turn off lights when rooms are empty.",
  "Reduce fan speed during low occupancy.",
  "Schedule automatic shutdown after office hours.",
  "Use natural lighting during daytime.",
];

function Energy() {
  const totalEnergy = roomData.reduce((sum, room) => sum + room.energy, 0);
  const totalCost = roomData.reduce((sum, room) => sum + room.cost, 0);

  const highestRoom = roomData.reduce((max, room) =>
    room.energy > max.energy ? room : max
  );

  return (
    <div className="p-6 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5">

        <div className="bg-[#141b2d] rounded-xl p-5">
          <BatteryCharging className="text-green-400 mb-3" size={28} />
          <p className="text-gray-400">Today's Energy</p>
          <h2 className="text-white text-3xl font-bold">
            {totalEnergy.toFixed(1)} kWh
          </h2>
        </div>

        <div className="bg-[#141b2d] rounded-xl p-5">
          <DollarSign className="text-yellow-400 mb-3" size={28} />
          <p className="text-gray-400">Today's Cost</p>
          <h2 className="text-yellow-400 text-3xl font-bold">
            ${totalCost.toFixed(2)}
          </h2>
        </div>

        <div className="bg-[#141b2d] rounded-xl p-5">
          <Zap className="text-red-400 mb-3" size={28} />
          <p className="text-gray-400">Peak Room</p>
          <h2 className="text-red-400 text-xl font-bold">
            {highestRoom.room}
          </h2>
        </div>

        <div className="bg-[#141b2d] rounded-xl p-5">
          <Leaf className="text-emerald-400 mb-3" size={28} />
          <p className="text-gray-400">Efficiency</p>
          <h2 className="text-emerald-400 text-3xl font-bold">
            88%
          </h2>
        </div>

      </div>

      {/* Room Consumption */}
      <div className="bg-[#141b2d] rounded-xl p-6">

        <h2 className="text-white text-xl font-semibold mb-5">
          Room-wise Energy Consumption
        </h2>

        <div className="space-y-5">

          {roomData.map((room) => (

            <div key={room.room}>

              <div className="flex justify-between mb-2">

                <div>
                  <h3 className="text-white">{room.room}</h3>
                  <p className="text-gray-400 text-sm">
                    {room.energy} kWh
                  </p>
                </div>

                <div className="text-green-400 font-semibold">
                  ${room.cost.toFixed(2)}
                </div>

              </div>

              <div className="bg-[#2c3650] rounded-full h-3">

                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${(room.energy / 10) * 100}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Energy Saving Tips */}
      <div className="bg-[#141b2d] rounded-xl p-6">

        <h2 className="text-white text-xl font-semibold mb-4">
          Energy Saving Tips
        </h2>

        <div className="space-y-3">

          {tips.map((tip, index) => (

            <div
              key={index}
              className="bg-[#1d263b] rounded-lg p-3 text-gray-300"
            >
              💡 {tip}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Energy;