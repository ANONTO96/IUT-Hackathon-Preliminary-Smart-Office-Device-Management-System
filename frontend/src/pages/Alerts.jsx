import { AlertTriangle, Clock, Lightbulb, Fan } from "lucide-react";

function Alerts() {
  const currentHour = new Date().getHours();

  const devices = [
    {
      name: "Drawing Room Lights",
      type: "Light",
      status: "ON",
    },
    {
      name: "Work Room 1 Fan",
      type: "Fan",
      status: "ON",
    },
    {
      name: "Work Room 2 Lights",
      type: "Light",
      status: "OFF",
    },
  ];

  const officeClosed = currentHour >= 22;

  const activeDevices = devices.filter(
    (device) => device.status === "ON"
  );

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Alerts & Notifications
      </h1>

      {/* Office Hours Alert */}
      {officeClosed && activeDevices.length > 0 && (
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
              Active Devices: {activeDevices.length}
            </p>

          </div>

        </div>
      )}

      {/* Active Devices */}
      <div className="bg-[#141b2d] rounded-xl p-5">

        <h2 className="text-white text-xl mb-5">
          Active Devices
        </h2>

        <div className="space-y-4">

          {activeDevices.map((device, index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-700 pb-3"
            >

              <div className="flex items-center gap-3">

                {device.type === "Light" ? (
                  <Lightbulb className="text-yellow-400" />
                ) : (
                  <Fan className="text-cyan-400" />
                )}

                <div>
                  <p className="text-white">
                    {device.name}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {device.type}
                  </p>
                </div>

              </div>

              <span className="text-green-400 font-semibold">
                ON
              </span>

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