import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const roomData = [
  {
    room: "Drawing Room",
    power: 180,
    fans: 2,
    lights: 3,
    devices: 5,
    status: "Occupied",
  },
  {
    room: "Work Room 1",
    power: 320,
    fans: 2,
    lights: 3,
    devices: 5,
    status: "Occupied",
  },
  {
    room: "Work Room 2",
    power: 290,
    fans: 2,
    lights: 3,
    devices: 5,
    status: "Occupied",
  },
];

const powerData = [
  { time: "12 AM", power: 120 },
  { time: "3 AM", power: 90 },
  { time: "6 AM", power: 150 },
  { time: "9 AM", power: 420 },
  { time: "12 PM", power: 680 },
  { time: "1 PM", power: 750 },
  { time: "2 PM", power: 690 },
  { time: "3 PM", power: 620 },
  { time: "4 PM", power: 580 },
  { time: "5 PM", power: 640 },
  { time: "6 PM", power: 510 },
  { time: "7 PM", power: 480 },
  { time: "8 PM", power: 420 },
  { time: "9 PM", power: 380 },
];

const weeklyUsageData = [
            ["Monday", 20],
            ["Tuesday", 23],
            ["Wednesday", 19],
            ["Thursday", 25],
            ["Friday", 22],
            ["Saturday", 16],
            ["Sunday", 18],
          ]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2030] border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-gray-400">{label}</p>
        <p className="text-green-400 font-medium">
          {payload[0].value} W
        </p>
      </div>
    );
  }

  return null;
}

function Analytics() {
  return (
    <>
    {/* power consumption chart */}
      <div className="bg-[#141b2d] p-5 rounded-xl h-72">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-sm font-medium">
            POWER CONSUMPTION (LIVE)
          </h2>
          <span className="text-gray-500 text-xs">Today</span>
        </div>

        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={powerData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="powerGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff10"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 1000]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="power"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#powerGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* power consumption from each room*/}
      <div className="bg-[#1b2436] rounded-xl p-5 my-6">
        <h2 className="text-white font-semibold mb-4">
          Room Power Consumption
        </h2>

        <div className="space-y-4 ">
          {roomData.map((room) => (
            <div key={room.room}>
              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="text-white">{room.room}</p>
                  <p className="text-xs text-gray-400">
                    {room.fans} Fans • {room.lights} Lights • {room.devices} Devices
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-400 font-semibold">
                    {room.power} W
                  </p>

                  <span className="text-xs text-blue-400">
                    {room.status}
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#2a3348] rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(room.power / 350) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Usage */}
      <div className="bg-[#141b2d] rounded-xl p-6">

        <h2 className="text-white text-xl font-semibold mb-5">
          Weekly Energy Usage
        </h2>

        <div className="space-y-3">

          {weeklyUsageData.map(([day, value]) => (

            <div key={day}>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{day}</span>
                <span className="text-white">{value} kWh</span>
              </div>

              <div className="bg-[#2c3650] rounded-full h-2">

                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(value / 30) * 100}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Analytics;